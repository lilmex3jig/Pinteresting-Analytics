/* In this server, it would simulate millions of lines of calls for raw ad data to the message bus in standard queue order (fifo does not matter here)

  The ec2 works will then pick up from the queue and translate those ads into the proper pinterest pin format and save them to the cache/database
  This could send in updates to the specific ads and the converted pins would be updated with the proper descriptions/etc.
  Also could have instructions to delete the ads all together if the ad agency decides to get rid of the ad compaign. 
*/
const db = require('../database-mysql');
//const request = require('request');

const adGeneration = (n) => {
  const adAmount = n * 1000;
  for (var i = adAmount; i < adAmount + 1000; i++) {    
    let id = i;
    let rand_ad_group_id = Math.floor(Math.random() * 1000);
    let rand_name = ['apple', 'google', 'sony', 'linkedin', 'verizon', 'microsoft', 'airbnb', 'instagram', 'snapchat', 'uber', 'lyft'][Math.floor(Math.random() * 10)];  
    let rand_description = ['this product is great',
      'this product will make life easier',
      'this product is on sale now',
      'buy 2 get 1 free', 
      'best product on the market', 
      'way better than its competition',
      'free shipping available',
      'low apr financing available',
      'no contract required',
      'just buy it',
      'example description'
    ][Math.floor(Math.random() * 10)];
    let rand_ad_url = rand_name + '.com/product/';
    let rand_img_url = rand_ad_url + '/image.jpeg';
    //let rand_ad_group = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 9)];
    let ad_status = 'active';
    //console.log(id, rand_ad_group_id, rand_name, rand_description, rand_ad_url, rand_img_url, rand_ad_group, ad_status);
    db.addAdvertisement(id, rand_ad_group_id, rand_name, rand_description, rand_ad_url, rand_img_url, ad_status, () => {
      console.log('added ad to DB');
    });
  }
};


let j = 0;
const howManyTimes = 1000; // Generates 1 million users to Database in about ~10 minutes
const f = () => {
  adGeneration(j);
  j++;
  if ( j < howManyTimes ) {
    setTimeout( f, 350 );
  }
};

f();