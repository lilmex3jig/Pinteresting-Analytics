const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const db = require('../database-mysql');

const queueURL = {
  receive: 'https://sqs.us-west-1.amazonaws.com/854541618844/analytics_aggregator'
};

const receiveMessageAnalytics = () => {
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

  const consumeAnalytics = sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log('Receive Error', err);
    } else if (data.Messages) {
      console.log('Receiving information: ', data.Messages[0].Body);
      let result = JSON.parse(data.Messages[0].Body);
      console.log('updating userID: ', result.userId);
      db.updateUser(result.userId, result.numAds, result.interests[0], result.interests[1], result.interests[2]);
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
  setInterval(receiveMessageAnalytics, 5000); 
  console.log(`Worker ${process.pid} started`);
}

module.exports = {
  receiveMessageAnalytics
};