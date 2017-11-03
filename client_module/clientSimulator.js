const request = require('request');

let i = 1;

const fakeUserGenerator = (i) => {
  return {user_id: nums = i};
};

// sends in a random userID ever second
setInterval(() => {
  i++;
  const options = {
    method: 'post',
    body: fakeUserGenerator(i),
    json: true,
    url: 'http://localhost:3000/clientgenerator',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log('UserID: ' + i + ' has pinged the server requesting for ads!')
    console.log(`Here are the ${res.body.length} ads coming back:`)
    console.log(res.body);
  });
}, 1000);