const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

//Simulates a call for ads to advertisements...
//Depreciated as we will no longer need this, Advertisements will be constantly updating
//the local DB with new ads.

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let i = 1;

const simulateResponse = () => {
  let amount = Math.ceil(Math.random() * 8);
  return {
    'amount': amount,
    'categories': shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, amount)
  };
};

const sendMessage = () => {
  const params = {
    MessageBody: JSON.stringify(simulateResponse()),
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/854541618844/ad_queries',
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
      console.log('Sent: ', params.MessageBody);
    }
  });
};
  
setInterval(sendMessage, 500);