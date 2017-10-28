const db = require('../database-mysql');

const adGeneration = (n) => {
  const adAmount = n * 1000;
  for (var i = adAmount; i < adAmount + 1000; i++) {    
    let id = i + 1;
    let rand_ad_group_id = Math.ceil(Math.random() * 10000);
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
    ][Math.floor(Math.random() * 11)];
    let rand_ad_url = rand_name + '.com/product/';
    let rand_img_url = rand_ad_url + '/image.jpeg';
    let ad_status = 'active';
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