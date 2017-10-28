const request = require('request');

const userRatioInterestUpdateGenerator = () => {
  const nums = Math.floor(Math.random() * 100000);
  const interest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 10)];
  const ratio = Math.ceil(Math.random() * 5);
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


