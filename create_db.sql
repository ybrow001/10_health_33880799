# create database
CREATE DATABASE IF NOT EXISTS health;
USE health;

# create tables
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT, 
    username VARCHAR(50), 
    hashed_password TINYTEXT, 
    email VARCHAR(50), 
    PRIMARY KEY(id)
);

# create application user
CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON health.* TO 'health_app'@'localhost';