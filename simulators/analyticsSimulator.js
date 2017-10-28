/* 
Here we would simulate millions of line of calls to the server with incoming user (N ads requested, and user preferences) calls.
This would hit the message queue in FIFO order and the EC2 workers would send queries to the cache/database and then curate an array of N number of ads that has the best chance of getting clicked.

*/

const request = require('request');

const userRatioInterestUpdateGenerator = () => {
  const nums = Math.floor(Math.random() * 10000);
  const interest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 9)];
  const ratio = Math.floor((Math.random() * 5) + 1);
  return { user_id: nums, user_ratio: ratio, user_interest: interest };
};

setInterval(() => {
  const options = {
    method: 'post',
    body: userRatioInterestUpdateGenerator(),
    json: true,
    url: 'http://localhost:3000/analytics',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });
}, 10);


