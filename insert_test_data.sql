-- insert test data into the tables

USE health;

INSERT INTO users (username, hashed_password, email) VALUES ('gold', '$2b$10$IPzYIKtMNKcnTkQF7kEGme3uYdSFumhkQJqFWsQKsSj5aVAy3yPcy', 'gs@gs.uk');
-- hashed password currently = smiths