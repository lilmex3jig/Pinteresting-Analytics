const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thesis',
});

connection.connect((err) => {
  if (err) {
    console.log('Error: Connection to database failed', err);
  } else {
    console.log('Connected to database');
  }
});

const addUser = (user_id, ratio, interest1, interest2, interest3, callback) => { 
  connection.query(
    `INSERT INTO users (id, ratio, interest1, interest2, interest3)
    VALUES(${user_id}, ${ratio}, '${interest1}', '${interest2}', '${interest3}');`, 
    (err, results) => {
      if (err) {
        console.log(err);
      }
      callback(results);
    });
};

const updateUser = (user_id, ratio, interest1, interest2, interest3, callback) => {
  connection.query(`UPDATE users SET ratio = ${ratio}, interest1 = '${interest1}' ,interest2 = '${interest2}', interest3 = '${interest3}' WHERE id=${user_id}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    // callback(results);
  });
};


const addAdvertisement = (ad_id, ad_group_id, ad_name, desc, ad_page_url, ad_img_url, cpm, cpc, daily_budget, daily_balance, main_interest_id, utc_offset, active, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT into advertisements (ad_description, ad_id, ad_group_id, ad_name, ad_page_url, ad_img_url, cpm, cpc, daily_budget, daily_balance, main_interest_id, utc_offset, active) VALUES ("${desc}", ${ad_id}, ${ad_group_id}, "${ad_name}", "${ad_page_url}", "${ad_img_url}", ${cpm}, ${cpc}, ${daily_budget}, ${daily_balance}, ${main_interest_id}, ${utc_offset}, ${active})`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}; 

const findUser = (user_id, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from users where id = ${user_id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });  
  });
};

const queryAdsInt = (ratio, main_interest_id, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT * 
    FROM advertisements 
    WHERE main_interest_id = ${main_interest_id} 
    AND active = true 
    AND daily_balance < daily_budget 
    order by cpm DESC 
    limit ${ratio};`, 
    (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const retireAd = (ad_group_id, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE advertisements SET active = false WHERE ad_group_id = ${ad_group_id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


const updateAdGroupBalance = (ad_group_id, times, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`
    UPDATE advertisements 
    SET 
    daily_balance = daily_balance + ${times} * (cpm/1000), 
    active = CASE
                      WHEN daily_balance + cpm/1000 > daily_budget THEN false
                      WHEN daily_balance + cpm/1000 <= daily_budget THEN true
                    END
    WHERE ad_group_id = ${ad_group_id};
    `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};



// const updateAdGroupBalance = (ad_group_id, times, callback) => {
//   return new Promise((resolve, reject) => {
//     connection.query(`UPDATE advertisements SET daily_balance = daily_balance + ${times} * (cpm/1000) WHERE ad_group_id = ${ad_group_id};`, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

module.exports = {
  addUser,
  updateUser,
  addAdvertisement,
  findUser,
  queryAdsInt,
  retireAd,
  updateAdGroupBalance
};
