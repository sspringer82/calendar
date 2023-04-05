CREATE DATABASE IF NOT EXISTS `calendar`;
USE `calendar`;

CREATE TABLE `appointments` (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  start INT,
  end INT,
  PRIMARY KEY (id)
);

INSERT INTO `appointments` (`title`, `start`, `end`) VALUES ('Get up', 1673510400, 1673514000);

CREATE TABLE `users` (
  id int NOT NULL AUTO_INCREMENT,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO `users` (`firstname`, `lastname`) VALUES ('Marie', 'Wagner'), ('Elias', 'Fischer'), ('Lenoie', 'Becker');