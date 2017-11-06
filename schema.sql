DROP DATABASE IF EXISTS thesis;

CREATE DATABASE thesis;

USE thesis;

CREATE TABLE advertisements (
  id int NOT NULL,
  ad_group_id int NOT NULL,
  ad_name varchar(100) NOT NULL,
  ad_description varchar(250) NOT NULL,
  ad_page_url varchar(250) NOT NULL,
  ad_img_url varchar(250) NOT NULL,
  cpm DECIMAL(3, 2),
  daily_budget DECIMAL (5, 2),
  balance DECIMAL (5, 2) DEFAULT 0,
  ad_interest int NOT NULL,
  ad_status varchar(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ad_groups (
  id int AUTO_INCREMENT,
  ad_group_id int NOT NULL,
  cpm DECIMAL(3, 2),
  daily_budget DECIMAL (5, 2),
  balance DECIMAL (5, 2) DEFAULT 0,
  ad_interests int NOT NULL,
  name varchar (100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL,
  user_ratio int NOT NULL,
  user_interest1_id INT NOT NULL,
  user_interest2_id INT NOT NULL,
  user_interest3_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE active_ad_groups (
  id int NOT NULL AUTO_INCREMENT,
  ad_group_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE retired_ad_groups (
  id int NOT NULL AUTO_INCREMENT,
  ad_group_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE daily_retired_ad_groups (
  id int NOT NULL AUTO_INCREMENT,
  ad_group_id int NOT NULL,
  release_time TIMESTAMP,
  PRIMARY KEY (id)
);
