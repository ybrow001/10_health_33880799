-- create database
CREATE DATABASE IF NOT EXISTS health;
USE health;

-- create tables
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT, 
    username VARCHAR(50) UNIQUE, 
    hashed_password TINYTEXT, 
    email VARCHAR(50) UNIQUE, 
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS calendar (
    id INT AUTO_INCREMENT, 
    user_id INT, 
    title VARCHAR(255), 
    start DATETIME, 
    end DATETIME, 
    description TEXT, 
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

-- CREATE TABLE IF NOT EXISTS timer (
--     id INT AUTO_INCREMENT, 
--     user_id INT, 
--     preference_1 TIME, 
--     preference_2 TIME,
--     preference_3 TIME,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     PRIMARY KEY(id)
-- );

-- create application user
CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON health.* TO 'health_app'@'localhost';