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
  ad_status varchar(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ad_groups (
  id int NOT NULL,
  name varchar (100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL,
  user_ratio int NOT NULL,
  user_interest varchar (200) NOT NULL,
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
