const express = require('express');
const AWS = require('aws-sdk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

AWS.config.loadFromPath('./configAdvertisements.json');

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = {
  send: 'https://sqs.us-east-2.amazonaws.com/672431855135/ad_queries',
  receive: 'https://sqs.us-east-2.amazonaws.com/672431855135/ad_responses',
};

const sendMessage = (amount, ad_categories) => {
  const params = {
    MessageBody: JSON.stringify({
      'amount' : amount,
      'ads' : ad_categories
    }),
    QueueUrl: queueURL.send,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
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
    QueueUrl: queueURL.receive,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 5,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      // console.log("Receive Error", err);
    } else if (data.Messages) {
      console.log(data);
      const deleteParams = {
        QueueUrl: queueURL.receive,
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
  setInterval(receiveMessage, 5000);

  const app = express();

  app.get('/ads', (req, res) => {
    sendMessage();
    res.send('SQS Message Sent to Advertisements Queue');
  });


  app.listen(5000);

  console.log(`Worker ${process.pid} started`);
}