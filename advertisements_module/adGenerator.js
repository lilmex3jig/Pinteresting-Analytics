const db = require('../database-mysql');

const NAME = [
  'apple', 'google', 'sony', 'linkedin', 'verizon', 'microsoft', 'airbnb',
  'instagram', 'snapchat', 'uber', 'lyft', 'kraft', 't-mobile', 'att',
  'sprint', 'oracle', 'honda', 'mercedes-benz', 'bmw', 'toyota', 'ford', 'ferrari',
  'outside lands', 'edc', 'ultra music festival', 'warriors', 'lakers', 'cavaliers', 
  'bulls', '76ers', 'celtics', 'real madrid', 'fc barcelona', '49ers', 'patriots',
  'levis', 'gap', 'old navy', 'banana republic', 'supreme', 'f21', 'nike', 'adidas',
  'j crew', 'under armour', 'mtv', 'netflix', 'amazon', 'ebay', 'yahoo', 'etsy', 'nikon',
  'canon', 'fujifilm', 'olympus', 'costco', 'walgreens', 'walmart', 'cvs', 'burger king', 
  'mcdonalds', 'hbo', 'showtime', 'espn', 'tnt', 'sizzlers', 'samsung', 'lg', 'innout'];  
const DESC = ['this product is great',
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
];

const adGeneration = (n) => {
  const adAmount = n * 500;
  for (var i = adAmount; i < adAmount + 500; i++) {    
    let id = i + 1;
    let rand_ad_group_id = Math.ceil(Math.random() * 10000);
    let name = NAME[Math.floor(Math.random() * 69)]
    let rand_ad_url = name + '.com/product/';
    let rand_img_url = rand_ad_url + 'image.jpeg';
    let ad_status = 'active';
    let adGroupId = Math.ceil(Math.random() * 10000); // start with 10000 ad groups
    let cpm = (Math.random() * 9.9).toFixed(2); //max bid will be 10
    let daily_budget = Math.ceil(Math.random() * 100) + 10; //limit daily budget to 100 first
    let balance = 0; 
    let ad_interest = Math.ceil(Math.random() * 10);
    db.addAdvertisement(id, rand_ad_group_id, name, DESC[Math.floor(Math.random() * 11)], rand_ad_url, rand_img_url, cpm, daily_budget, balance, ad_interest, ad_status)
      .then(() => {
        //populate active_ad_groups as well.
        db.addActiveAdGroups(id);
      }).then(() => {
        db.addAdGroups(adGroupId, cpm, daily_budget, balance, ad_interest, name);
      });
  }
};

let j = 1;
const howManyTimes = 500; // Generates 1 million users to Database in about ~10 minutes
const f = () => {
  adGeneration(j);
  j++;
  if ( j < howManyTimes ) {
    setTimeout( f, 350 );
  }
};

f();