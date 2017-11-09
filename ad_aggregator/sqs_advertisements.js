const express = require('express');
const AWS = require('aws-sdk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const helper = require('./helper.js');
const db = require('../database-mysql');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = {
  send: 'https://sqs.us-west-1.amazonaws.com/854541618844/ad_queries',
  receive: 'https://sqs.us-west-1.amazonaws.com/854541618844/ad_responses',
};

const sendMessage = (amount, ad_categories) => {
  let query = helper.weightedResult(amount, ad_categories);
  const params = {
    MessageBody: JSON.stringify(query),
    QueueUrl: queueURL.send,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};

const receiveMessage = () => {
  const params = {
    AttributeNames: [
      'SentTimestamp',
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      'All',
    ],
    QueueUrl: queueURL.receive,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 5,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log('Receive Error', err);
    } else if (data.Messages) {
      //Adds ads from advertisements component to local database
      let results = JSON.parse(data.Messages[0].Body);
      results.forEach((result) => {
        let adId = result.ad_id;
        let adGroupId = result.ad_group_id;
        let name = result.ad_name;
        let desc = result.ad_description;
        let url = result.ad_page_url;
        let img_url = result.ad_img_url;
        let cpm = result.cpm;
        let cpc = result.cpc;
        let budget = result.daily_budget;
        let balance = result.daily_balance;
        let main = result.main_interest_id;
        let utc = result.utc_offset;
        let active = result.active;
        db.addAdvertisement(adId, adGroupId, name, desc, url, img_url, cpm, cpc, budget, balance, main, utc, active);
      });
      const deleteParams = {
        QueueUrl: queueURL.receive,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, (err, data) => {
        if (err) {
          console.log('Delete Error', err);
        } else {
          console.log('Message Deleted', data);
        }
      });
    }
  });
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
  //Consume Messages every n seconds..
  setInterval(receiveMessage, 4000);
  const app = express();

  //sends a sqs message to the queue via a call to /ads route to prepopulate database
  app.get('/initialize', (req, res) => {
    for (var i = 4; i <= 10; i ++) {
      sendMessage(200, [i, 2, 3]);
    }
    res.send('Initializing database with 200 ads for each interest ID from Advertisements component');
  });

  app.get('/callfornewads', (req, res) => {
      sendMessage(200, [1, 2, 3]);
    }
    res.send('Initializing database with 200 ads for each interest ID from Advertisements component');
  });

  app.get('/testbalance', (req, res) => {
    setInterval(()=>{ db.updateAdGroupBalance(6267251, 500); }, 3000);
    res.send('ad_group_id 6267251 should be having its balance updated every 3 seconds');
  });

  app.get('/retire', (req, res) => {
    db.retireAd(6267251);
    res.send('Ad_group_id 6267251 will now be retired');
  });

  app.listen(5002);
  console.log(`Worker ${process.pid} started`);
}