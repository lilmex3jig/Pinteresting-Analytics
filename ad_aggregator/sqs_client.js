const express = require('express');
const AWS = require('aws-sdk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const db = require('../database-mysql');
const Promise = require('bluebird');
AWS.config.loadFromPath('../config.json');

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = {
  request: 'https://sqs.us-west-1.amazonaws.com/854541618844/client_request',
  receive: 'https://sqs.us-west-1.amazonaws.com/854541618844/client_response',
};

const sendMessage = (ads) => {
  const params = {
    MessageBody: JSON.stringify(ads),
    QueueUrl: queueURL.receive,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log('Aggregator sent back ads to client!');
      console.log("Success", data.MessageId);
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
    QueueUrl: queueURL.request,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 5,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log("Received Error", err);
    } else if (data.Messages) {
/*
  db.findUser(req.body.user_id) 
    .then((result) => {
      //bid simulation here which is finding the ads that will be returned to client
      //sends information to advertisements
      return db.queryAds(result[0].user_ratio, Math.ceil(Math.random() * 1000))
    })
    .then((results) => {
      //return the ads to the client here
      //polls results from advertiesments and sends it back to client
      console.log('Here are the ' + results.length + ' ads requested: ', results);
      res.send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
*/

    //if we receive a userId...

    //we want to query the database to get the ratio and top ads
      let result = JSON.parse(data.Messages[0].Body);
      db.findUser(result.userId)
        .then((userInfo) => {
          console.log(`UserId:${result.userId}, Ratio wanted: ${userInfo[0].user_ratio}, Adinterest: [${userInfo[0].user_interest1_id}, ${userInfo[0].user_interest2_id}, ${userInfo[0].user_interest3_id}]`)
          return db.queryAdsInt(userInfo[0].user_ratio, userInfo[0].user_interest1_id)
        })
        .then((ads) => {
          console.log(`UserId:${result.userId}, will be receiving these ads: `, ads);
          //send message to client SQS HERE, should work!
          //needs formatting
          sendMessage(ads);
          
        })
        .then(() => {
          console.log('COMPLETE')
          // update the balance for ad_group
          //if balance > ad_group_budget  RETIRE
        });


      const deleteParams = {
        QueueUrl: queueURL.request,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, (err, data) => {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
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
  setInterval(receiveMessage, 1000);
  console.log(`There are ${numCPUs} threads avavilable`);  
  const app = express();

  app.listen(5000);

  console.log(`Worker ${process.pid} started`);
}