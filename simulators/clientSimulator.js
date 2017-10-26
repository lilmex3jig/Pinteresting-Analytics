/*
This simulator will simulate user request for ads by sending in HTTP request
to the server with a userID
*/
// const http = require('http');

const request = require('request');

const fakeUserGenerator = () => {
  const nums = [...Array(1000000).keys()];
  return { user_id: nums[Math.floor(Math.random() * 1000000)] };
};

setInterval(() => {
  const options = {
    method: 'post',
    body: fakeUserGenerator(),
    json: true,
    url: 'http://localhost:3000/client',
  };

  request(options, (err, res, body) => {
    if (err) console.log(err);
    console.log(body);
  });
}, 1);

// Simulates a new call for users with a userID between 1-10000 using HTTP request
// setInterval(() => {
//   http.get('http://localhost:3000/test', (err, res) => {
//     if (err) { console.log('there was an err'); }
//     console.log(fakeUserGenerator());
//   });
// }, 100);
