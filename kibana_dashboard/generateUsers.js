const request = require('request');

//Creating a script to load the elastic database with users

const test = (i) => {
  let id = i;
  let ratio = Math.ceil(Math.random() * 5);
  let randomInterest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 10)];
  
  let result =  {
    'userID': `${id}`,
    'user_ratio': `${ratio}`,
    'user_interest': `${randomInterest}`
  };

  const options = {
    method: 'post',
    body: result,
    json: true,
    url: `http://localhost:9200/thesis/users/${i}`,
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });

};


let i = 1;
const howManyTimes = 500000; 
const f = () => {
  test(i);
  i++;
  if ( i < howManyTimes ) {
    setTimeout( f, 4 );
  }
};
f();
