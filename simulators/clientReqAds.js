const request = require('request');

const fakeUserGenerator = () => {
  return {user_id: nums = Math.floor((Math.random() * 250000) + 1)};
};

// sends in a random userID ever second
setInterval(() => {
  const options = {
    method: 'post',
    body: fakeUserGenerator(),
    json: true,
    url: 'http://localhost:3000/client1',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });
}, 5);