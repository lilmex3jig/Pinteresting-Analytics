DROP DATABASE IF EXISTS thesis;

CREATE DATABASE thesis;

USE thesis;

CREATE TABLE advertisements (
  id int NOT NULL AUTO_INCREMENT,
  ad_id int NOT NULL,
  ad_group_id int NOT NULL,
  ad_name varchar(100) NOT NULL,
  ad_description varchar(250) NOT NULL,
  ad_page_url varchar(250) NOT NULL,
  ad_img_url varchar(250) NOT NULL,
  cpm DOUBLE NOT NULL,
  cpc DOUBLE NOT NULL,
  daily_budget DOUBLE NOT NULL,
  daily_balance DOUBLE DEFAULT 0 NOT NULL,
  main_interest_id int NOT NULL,
  utc_offset int NOT NULL,
  active boolean DEFAULT true NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE advertisements2 (
  id int NOT NULL AUTO_INCREMENT,
  ad_id int NOT NULL,
  ad_group_id int NOT NULL,
  ad_name varchar(100) NOT NULL,
  ad_description varchar(250) NOT NULL,
  ad_page_url varchar(250) NOT NULL,
  ad_img_url varchar(250) NOT NULL,
  cpm DOUBLE NOT NULL,
  cpc DOUBLE NOT NULL,
  daily_budget DOUBLE NOT NULL,
  daily_balance DOUBLE DEFAULT 0 NOT NULL,
  main_interest_id int NOT NULL,
  utc_offset int NOT NULL,
  active boolean DEFAULT true NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL,
  ratio int NOT NULL,
  interest1 INT NOT NULL,
  interest2 INT NOT NULL,
  interest3 INT NOT NULL,
  PRIMARY KEY (id)
);

