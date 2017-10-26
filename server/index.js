// const sqs = require('sqs');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// This is where client will call for ads, sending in a userID

app.post('/client', (req, res) => {
  console.log('response from post to /client: Success');
  console.log('Server has recieved userID: ', req.body.user_id);
  const randomInterest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 9)];
  const randomRatio = Math.floor(Math.random() * (5) + 1);
  // query cache/DB for user's optimal Ratio/interest
  db.addUser(req.body.user_id, randomRatio, randomInterest, () => {
    console.log('updated database!');
  });
  res.send('added to database!');
});

//  This is where analytics will update a users ratio and top interest
app.post('/analytics', (req, res) => {
  console.log('response from post to /analytics: Success');
  console.log('Server has recieved updates: ', req.body);
  // We would go to the database and update said user ratios and values here
  db.updateUser(req.body.user_id, req.body.user_ratio, req.body.user_interest, () => {
    console.log('users ratio and category has been updated');
  });
  res.send('Server has updated user ratios and interests');
});

// This is where we add advertisments into the advertisements table
app.get('/ads', (req, res) => {
  console.log('response from get to /ads');
  res.send('Server responds back');
});

// This is where the ad component will update us that certain ads should be retired
app.post('/ads', (req, res) => {
  console.log('deactivating ads');
  res.send('Some ads has been deactivated!');
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
