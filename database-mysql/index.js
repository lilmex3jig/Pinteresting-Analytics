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

const addUser = (user_id, user_ratio, user_interest, callback) => { 
  connection.query(`INSERT INTO users (id, user_ratio, user_interest) VALUES(${user_id}, ${user_ratio}, '${user_interest}')`, (err, results) => {
    if (err) console.log(err);
    callback(results);
  });
};

const updateUser = (user_id, user_ratio, user_interest, callback) => {
  connection.query(`UPDATE users SET user_ratio= ${user_ratio}, user_interest= '${user_interest}' WHERE id=${user_id}`, (err, results) => {
    if (err) console.log(err);
    callback(results);
  });
};

const addAdvertisement = (id, ad_group_id, ad_name, ad_description, ad_page_url, ad_img_url, ad_status, callback) => {
  connection.query(`INSERT into advertisements (id, ad_group_id, ad_name, ad_description, ad_page_url, ad_img_url, ad_status) VALUES (${id}, ${ad_group_id}, '${ad_name}', '${ad_description}', '${ad_page_url}', '${ad_img_url}', '${ad_status}')`, (err, results) => {
    //if (err) console.log(err);
    //callback(results);
  });
};

module.exports = {
  addUser,
  updateUser,
  addAdvertisement,
};
