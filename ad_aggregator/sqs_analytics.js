const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./configAnalytics.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const db = require('../database-mysql');

const queueURL = {
  receive: 'https://sqs.us-west-2.amazonaws.com/470758207750/analyticsOutput'
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
      // console.log("Receive Error", err);
    } else if (data.Messages) {
      console.log(data);
      let result = JSON.parse(data.Messages.body);
      console.log('updating userID: ', result.user_id);
      db.updateUser(result.user_id, result.numAds, result.interests[0], result.interests[1], results.interests[2]);
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
  setInterval(receiveMessageAnalytics, 5000); 
  console.log(`Worker ${process.pid} started`);
}

module.exports = {
  receiveMessageAnalytics
};