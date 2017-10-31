const db = require('../database-mysql');

const populateDatabase = (n) => {
  const userAmount = n * 1000;
  for (var i = userAmount + 1; i < userAmount + 1001; i++) {
    const randomInterest = ['food', 'fashion', 'products', 'sports', 'travel', 'events', 'design', 'entertainment', 'DIY/crafts', 'photography'][Math.floor(Math.random() * 10)];
    let randomRatio = Math.ceil(Math.random() * 5);
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

