const request = require('request');

//Creating a script to load the elastic database with users

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const test = (i) => {
  let id = i;
  let ratio = Math.ceil(Math.random() * 5);
  let randomInterest = shuffle(['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography']);
  let result =  {
    'userID': `${id}`,
    'user_ratio': `${ratio}`,
    'user_interest': `[${randomInterest[0]}, ${randomInterest[1]}, ${randomInterest[2]}]`
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
const howManyTimes = 100000; 
const f = () => {
  test(i);
  i++;
  if ( i < howManyTimes ) {
    setTimeout( f, 4 );
  }
};
f();
