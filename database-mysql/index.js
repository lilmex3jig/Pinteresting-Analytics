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

const addUser = (user_id, user_ratio, user_interest1, user_interest2, user_interest3,callback) => { 
  connection.query(`INSERT INTO users (id, user_ratio, user_interest1_id, user_interest2_id, user_interest3_id) VALUES(${user_id}, ${user_ratio}, '${user_interest1}', '${user_interest2}', '${user_interest3}')`, (err, results) => {
    if (err) console.log(err);
    callback(results);
  });
};

const updateUser = (user_id, user_ratio, user_interest1, user_interest2, user_interest3, callback) => {
  connection.query(`UPDATE users SET user_ratio= ${user_ratio}, user_interest1_id= '${user_interest1}' ,user_interest2_id= '${user_interest2}', user_interest3_id= '${user_interest3}' WHERE id=${user_id}`, (err, results) => {
    if (err) console.log(err);
    // callback(results);
  });
};

const addAdvertisement = (id, ad_group_id, ad_name, ad_description, ad_page_url, ad_img_url, cpm, daily_budget, balance, ad_interest, ad_status, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT into advertisements (id, ad_group_id, ad_name, ad_description, ad_page_url, ad_img_url, cpm, daily_budget, balance, ad_interest, ad_status) VALUES (${id}, ${ad_group_id}, '${ad_name}', '${ad_description}', '${ad_page_url}', '${ad_img_url}', '${cpm}', '${daily_budget}', '${balance}', '${ad_interest}', '${ad_status}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}; 

const addAdGroups = (adGroupId, cpm, daily_budget, balance, ad_interests, name, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT into ad_groups (ad_group_id, cpm, daily_budget, balance, ad_interests, name) VALUES('${adGroupId}', '${cpm}', '${daily_budget}', '${balance}', '${ad_interests}', '${name}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const addActiveAdGroups = (id, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT into active_ad_groups (ad_group_id) VALUES(${id})`, (err, result) => {
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

const queryAds = (ratio, ad_group_id, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from advertisements where ad_group_id = ${ad_group_id} limit ${ratio};`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const queryAdsInt = (ratio, ad_interest, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from advertisements where ad_interest = ${ad_interest} limit ${ratio};`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  addUser,
  updateUser,
  addAdvertisement,
  findUser,
  queryAds,
  addAdGroups,
  addActiveAdGroups,
  queryAdsInt
};
