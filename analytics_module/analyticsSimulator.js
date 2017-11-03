const request = require('request');

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

//for a million users we will update 10 users ratio's and top 3 interests per second via http calls to the analytics route
const userRatioInterestUpdateGenerator = () => {
  const nums = Math.floor(Math.random() * 1000000);
  //const interestWords = shuffle(['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography']);
  const interest = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const ratio = Math.ceil(Math.random() * 5);
  return { 
    user_id: nums, 
    user_ratio: ratio, 
    user_interest1: interest[0],
    user_interest2: interest[1],
    user_interest3: interest[2]
  };
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
}, 100);


