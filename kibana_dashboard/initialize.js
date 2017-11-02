const request = require('request');

const addDailyInactiveAds = () => {
  //intializes the inactive ads object
  let result =  {
    'inactive_ids': []
  };
  const options = {
    method: 'post',
    body: result,
    json: true,
    url: 'http://localhost:9200/thesis/daily_inactive_ads/1',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });
};

const addActiveAds = () => {
    //initializes the active ads object
  let result =  {
    'active_ids': []
  };
  const options = {
    method: 'post',
    body: result,
    json: true,
    url: 'http://localhost:9200/thesis/active_ad_ids/1',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });
};

const addInterest = () => {
  //initializes the 10 interests objects inside the interests type
  for (var i = 1; i <= 10; i++) {
    let result =  {
      'interest_id': i,
      'ad_ids': []
    };
    const options = {
      method: 'post',
      body: result,
      json: true,
      url: `http://localhost:9200/thesis/interests/${i}`,
    };

    request(options, (err, res, body) => {
      if (err) { console.log(err); }
      console.log(body);
    });
  }
};

const addAds = () => {
  //inserts an ad to the ads type to initialize
  let result =  {
    'ad_id': 1,
    'name': 'Apple',
    'page_url': 'www.apple.com',
    'img_url': 'i.imgur.com/QYn9Xgn.jpg',
    'description': 'The new iPhone X',
    'ad_ids': [2, 3],
    'ad_group_balance': 0,
    'ad_group_daily_budget': 10,
    'CPM': 5
  };
  const options = {
    method: 'post',
    body: result,
    json: true,
    url: 'http://localhost:9200/thesis/ads/1',
  };

  request(options, (err, res, body) => {
    if (err) { console.log(err); }
    console.log(body);
  });
};

addAds();
addDailyInactiveAds();
addActiveAds();
addInterest();



