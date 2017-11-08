const db = require('../database-mysql');

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const populateDatabase = (n) => {
  const userAmount = n * 1000;
  for (var i = userAmount + 1; i < userAmount + 1001; i++) {
    const interestid = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let randomRatio = Math.ceil(Math.random() * 8);
    console.log('added userid:' + i + ' randomRatio: ' + randomRatio + ' int1id: ' + interestid[0] + ', int2id: ' + interestid[1] + ', int3id: ' + interestid[2]);
    db.addUser(i, randomRatio, interestid[0], interestid[1], interestid[2], () => {
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

