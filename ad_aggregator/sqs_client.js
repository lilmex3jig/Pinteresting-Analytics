const express = require('express');
const AWS = require('aws-sdk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const db = require('../database-mysql');
const Promise = require('bluebird');
const helper = require('./helper.js');
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
      console.log('Error', err);
    } else {
      console.log('Aggregator sent back ads to client!');
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
    QueueUrl: queueURL.request,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 5,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log('Received Error', err);
    } else if (data.Messages) {
      let result = JSON.parse(data.Messages[0].Body);
      db.findUser(result.userId)
        .then((userInfo) => {
          console.log(`UserId:${result.userId}, Ratio wanted: ${userInfo[0].ratio}, Adinterest: [${userInfo[0].interest1}, ${userInfo[0].interest2}, ${userInfo[0].interest3}]`)
          let newQuery = helper.weightedResult(userInfo[0].ratio, [userInfo[0].interest1, userInfo[0].interest2, userInfo[0].interest3]);
          let queryPromises = Object.entries(newQuery).map((el) => {
            return db.queryAdsInt(el[1], el[0]);
          });
          return Promise.all(queryPromises);
        })
        .then((ads) => {
          let finalResult = [];
          for (let i = 0; i < ads.length; i++) {
            finalResult = finalResult.concat(ads[i]);
          }
          console.log(`UserId:${result.userId}, will be receiving these ads: `, finalResult);
          sendMessage({
            userId: result.userId,
            ads: finalResult
          });
          return finalResult;
        })
        .then((ads) => {
          let balanceUpdater = helper.getGroupIdAndAmount(ads);
          console.log('Updating balance or retiring these ad_groups:', balanceUpdater);
          let balancePromises = Object.entries(balanceUpdater).map((ad_group) => {
            return db.updateAdGroupBalance(ad_group[0], ad_group[1]);

          });
          return Promise.all(balancePromises);
        }).then(()=> {
          // check database if the three main interest id's are low in stock of ads
          //let activeAdsLeft = db.checkActiveAds(userInfo[0].interest1);
          //activeAdsLeft.then(()=> console.log('ACTIVE ADS LEFT', activeAdsLeft.length));
          console.log('Finished!');
        });

      const deleteParams = {
        QueueUrl: queueURL.request,
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
  setInterval(receiveMessage, 2000);
  console.log(`There are ${numCPUs} threads avavilable`);  
  const app = express();

  app.listen(5001);

  console.log(`Worker ${process.pid} started`);
}