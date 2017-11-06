// const request = require('request');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });


const queueURL = {
  send: 'https://sqs.us-west-1.amazonaws.com/854541618844/client_request',
  receive: 'https://sqs.us-west-1.amazonaws.com/854541618844/client_response',
};

let i = 1;
// to test sending in users in order
const generateUserId = (i) => {
  return {userId: i};
};

//to test sending in random userId's
const generateRandomUserId = (amount) => {
  return {userId: Math.ceil(Math.random() * amount )};
};

const sendMessage = (i) => {
  const params = {
    MessageBody: JSON.stringify(generateUserId(i)),
    QueueUrl: queueURL.send,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(`Client sent userId: ${i} to Aggregator via SQS`);
      console.log("Success", data.MessageId);
    }
  });
};

setInterval(()=> {sendMessage(i); i++}, 1000);




// sends in a random userID ever second
// setInterval(() => {
//   i++;
//   const options = {
//     method: 'post',
//     body: fakeUserGenerator(i),
//     json: true,
//     url: 'http://localhost:3000/clientgenerator',
//   };

//   request(options, (err, res, body) => {
//     if (err) { console.log(err); }
//     console.log('UserID: ' + i + ' has pinged the server requesting for ads!')
//     console.log(`Here are the ${res.body.length} ads coming back:`)
//     console.log(res.body);
//   });
// }, 250);