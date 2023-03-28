CREATE DATABASE IF NOT EXISTS node;

USE node;

CREATE TABLE IF NOT EXISTS people (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO people (name) VALUES ('Alice');
INSERT INTO people (name) VALUES ('Bob');
INSERT INTO people (name) VALUES ('Charlie');
INSERT INTO people (name) VALUES ('David');
INSERT INTO people (name) VALUES ('Eve');
INSERT INTO people (name) VALUES ('Frank');
INSERT INTO people (name) VALUES ('Grace');
INSERT INTO people (name) VALUES ('Henry');
INSERT INTO people (name) VALUES ('Ivy');
INSERT INTO people (name) VALUES ('John');