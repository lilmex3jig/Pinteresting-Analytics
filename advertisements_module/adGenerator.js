const db = require('../database-mysql');

const NAME = [
  'apple', 'google', 'sony', 'linkedin', 'verizon', 'microsoft', 'airbnb',
  'instagram', 'snapchat', 'uber', 'lyft', 'kraft', 't-mobile', 'att',
  'sprint', 'oracle', 'honda', 'mercedes-benz', 'bmw', 'toyota', 'ford', 'ferrari',
  'outsidelands', 'EDC', 'UltraMusicFestival', 'warriors', 'lakers', 'cavaliers', 
  'bulls', '76ers', 'celtics', 'RealMadrid', 'FCBarcelona', '49ers', 'patriots',
  'levis', 'gap', 'old navy', 'banana republic', 'supreme', 'f21', 'nike', 'adidas',
  'jcrew', 'under armour', 'mtv', 'netflix', 'amazon', 'ebay', 'yahoo', 'etsy', 'nikon',
  'canon', 'fujifilm', 'olympus', 'costco', 'walgreens', 'walmart', 'cvs', 'burger king', 
  'mcdonalds', 'hbo', 'showtime', 'espn', 'tnt', 'sizzlers', 'samsung', 'lg', 'innout'];  
  
const DESC = ['this product is great',
  'This product will make life easier',
  'This product is on sale now',
  'Buy 2 get 1 free', 
  'Best product on the market', 
  'Way better than our competition',
  'Free shipping available',
  'Low apr financing available',
  'No contract required',
  'Just buy it',
  'Example description'
];

const UTC = [
  -840, -825, -810, -795, -780, -765, -750, -735, -720, -705, -690, -675, -660, -645,
  -630, -615, -600, -585, -570, -555, -540, -525, -510, -495, -480, -465, -450, -435,
  -420, -405, -390, -375, -360, -345, -330, -315, -300, -285, -270, -255, -240, -225, 
  -210, -195, -180, -165, -150, -135, -120, -105, -90, -75, -60, -45, -30, -15, 0, 15,
  30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 
  300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 
  555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720];

const adGeneration = (n) => {
  const adAmount = n * 500;
  for (var i = adAmount; i < adAmount + 500; i++) {    
    let id = i + 1;
    let rand_ad_group_id = Math.ceil(Math.random() * 10000);
    let name = NAME[Math.floor(Math.random() * 69)]
    let rand_ad_url = name + '.com/product/';
    let rand_img_url = rand_ad_url + 'image.jpeg';
    let active = true;
    let adGroupId = Math.ceil(Math.random() * 10000); // start with 10000 ad groups
    let cpm = (Math.random() * 9.9).toFixed(2); //max bid will be 10
    let cpc = (Math.random() * 9.9).toFixed(2);
    let daily_budget = Math.ceil(Math.random() * 100) + 10; //limit daily budget to 100 first
    let daily_balance = 0; 
    let main_interest_id = Math.ceil(Math.random() * 10);
    let utc_offset = UTC[Math.floor(Math.random() * 105)]; //increases by 15 from -12:00 - +14:00 UTC
    db.addAdvertisement(id, rand_ad_group_id, name, DESC[Math.floor(Math.random() * 11)], rand_ad_url, rand_img_url, cpm, cpc, daily_budget, daily_balance, main_interest_id, active, utc_offset);
  }
};

let j = 0;
const howManyTimes = 500; // Generates 1 million users to Database in about ~10 minutes
const f = () => {
  adGeneration(j);
  j++;
  if ( j < howManyTimes ) {
    setTimeout( f, 350 );
  }
};

f();