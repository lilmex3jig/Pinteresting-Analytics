const request = require('request');

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const addDailyInactiveAds = () => {
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

addDailyInactiveAds();

// let i = 1;
// const howManyTimes = 100000; 
// const f = () => {
//   test(i);
//   i++;
//   if ( i < howManyTimes ) {
//     setTimeout( f, 4 );
//   }
// };
// f();