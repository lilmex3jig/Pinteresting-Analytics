const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

//Simulates response back to the client after getting the Ads

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let i = 1;

const simulateResponse = () => {
  let amount = Math.ceil(Math.random() * 5);
  return {
    "amount": amount,
    "categories": shuffle([1, 1, 4, 7, 6]).slice(0, amount)
  };
};


const sendMessage = () => {
  const params = {
    MessageBody: JSON.stringify(simulateResponse()),
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/854541618844/ad_queries',
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
      console.log('Sent: ', params.MessageBody)
    }
  });
};
  
setInterval(sendMessage, 500);