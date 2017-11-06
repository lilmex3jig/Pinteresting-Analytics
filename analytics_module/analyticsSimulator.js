//const request = require('request');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

//for a million users we will update 10 users ratio's and top 3 interests per second via http calls to the analytics route
const userRatioInterestUpdateGenerator = () => {
  const nums = Math.floor(Math.random() * 10);
  //const interestWords = shuffle(['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography']);
  const interest = shuffle([7, 8, 9, 10]);
  const ratio = 1//Math.ceil(Math.random() * 5);
  return { 
    userId: nums, 
    interests: [interest[0], interest[1], interest[2]],
    numAds: ratio, 
  };
};

//Send to the queue between analytics and aggregator
const sendMessage = () => {
  const params = {
    MessageBody: JSON.stringify(userRatioInterestUpdateGenerator()),
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/854541618844/analytics_aggregator',
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log('Updating: ', params.MessageBody);
      console.log("Success", data.MessageId);
    }
  });
};


//Analytics will send this message every 2 seconds
setInterval(sendMessage, 2000);

// setInterval(() => {
//   const options = {
//     method: 'post',
//     body: userRatioInterestUpdateGenerator(),
//     json: true,
//     url: 'http://localhost:3000/analytics',
//   };

//   request(options, (err, res, body) => {
//     if (err) { console.log(err); }
//     console.log(body);
//   });
// }, 1000);


