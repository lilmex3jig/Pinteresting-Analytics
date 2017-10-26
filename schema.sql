DROP DATABASE IF EXISTS thesis;

CREATE DATABASE thesis;

USE thesis;

CREATE TABLE advertisements (
  id int NOT NULL,
  ad_description varchar(500) NOT NULL,
  ad_url varchar(500) NOT NULL,
  ad_img_url varchar(500) NOT NULL,
  ad_group varchar (100) NOT NULL,
  ad_status ENUM('active', 'day', 'indefinite'),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL,
  user_ratio int NOT NULL,
  user_interest varchar (200) NOT NULL,
  PRIMARY KEY (id)
);

INSERT into advertisements (id, ad_description, ad_url, ad_img_url, ad_group, ad_status) 
VALUES (1, 'The New iPhone X will come with super techy stuff', 'https://www.apple.com/iphone-x/', 'http://drop.ndtv.com/TECH/product_database/images/913201720152AM_635_iphone_x.jpeg', 
  'products', 'active');

INSERT into users (id, user_ratio, user_interest) 
VALUES (1253, 4, 'photography');
INSERT into users (id, user_ratio, user_interest) 
VALUES (1234, 2, 'travel');
INSERT into users (id, user_ratio, user_interest) 
VALUES (6243, 5, 'sports');
INSERT into users (id, user_ratio, user_interest) 
VALUES (2314, 3, 'food');
INSERT into users (id, user_ratio, user_interest) 
VALUES (5452, 3, 'events');
INSERT into users (id, user_ratio, user_interest) 
VALUES (3989, 5, 'food');
INSERT into users (id, user_ratio, user_interest) 
VALUES (7356, 1, 'products');