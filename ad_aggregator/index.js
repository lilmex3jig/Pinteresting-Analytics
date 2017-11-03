const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const Promise = require('bluebird');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const app = express();
const PORT = 3000;

const config = require()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/client', (req, res) => {
//   console.log('response from post to /client: Success');
//   console.log('Server has recieved userID: ', req.body.user_id);
//   const randomInterest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 9)];
//   const randomRatio = Math.ceil(Math.random() * 5);
//   db.addUser(req.body.user_id, randomRatio, randomInterest, () => {
//     console.log('updated database!');
//   });
//   res.send('added to database!');
// });

//Main router that takes in a userID and returns them the ads.
app.post('/clientgenerator', (req, res) => {
  //get the user ratio and top interests
  db.findUser(req.body.user_id) 
    .then((result) => {
      //bid simulation here which is finding the ads that will be returned to client

      return db.queryAds(result[0].user_ratio, Math.ceil(Math.random() * 1000))
    })
    .then((results) => {
      //return the ads to the client here
      console.log('Here are the ' + results.length + ' ads requested: ', results);
      res.send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


//  This is where analytics will update a users ratio and top interest
app.post('/analytics', (req, res) => {
  console.log('Server has recieved updates: ', req.body);
  // We would go to the database and update said user ratios and values here
  db.updateUser(req.body.user_id, req.body.user_ratio, req.body.user_interest1, req.body.user_interest2, req.body.user_interest3, () => {
    console.log('users ratio and category has been updated');
  });
  res.send('Server has updated user ratios and interests');
});

app.get("/", (req, res) => res.json({message: "Connected to Server!"}));

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

const runMe = () => {
  return {user_id: 123, user_ratio: 4, user_category: 'food'};
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  app,
  runMe
};