/*
This simulator will simulate user request for ads by sending in HTTP request
to the server with a userID
*/
// const http = require('http');
const db = require('../database-mysql');
//const request = require('request');

const fakeUserGenerator = () => {
  return nums = Math.floor((Math.random() * 1000) + 1);
};

// setInterval(() => {
//   const options = {
//     method: 'post',
//     body: fakeUserGenerator(),
//     json: true,
//     url: 'http://localhost:3000/client',
//   };

//   request(options, (err, res, body) => {
//     if (err) console.log(err);
//     console.log(body);
//   });
// }, 1);

// fill up database with 1000000 users with random ratios and random top interests

const populateDatabase = (n) => {
  const userAmount = n * 1000;
  for (var i = userAmount; i < userAmount + 1000; i++) {
    const randomInterest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 9)];
    let randomRatio = Math.floor(Math.random() * (5) + 1);
    console.log('added userid:' + i + ' randomRatio: ' + randomRatio + ' randomCategory: ' + randomInterest);
    db.addUser(i, randomRatio, randomInterest, () => {
      console.log('db updated!');
    });
  }
};

let i = 0;
const howManyTimes = 1000; // Generates 1 million users to Database in about ~6 minutes
const f = () => {
  populateDatabase(i);
  i++;
  if ( i < howManyTimes ) {
    setTimeout( f, 250 );
  }
};
f();

