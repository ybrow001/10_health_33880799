-- insert test data into the tables

USE health;

INSERT INTO users (username, hashed_password, email) VALUES ('gold', '$2b$10$0n7UznULOCja/HlxHU.CDeT49exwvKNo0iSogkvxoi9JqA25arobK', 'gs@gs.ac.uk');
-- disclaimer: user credentials should not be in an opely available location such as this, however I am including it for the sake of this assessment.

INSERT INTO calendar (user_id, event_title, event_start, event_end, event_description) VALUES (1, 'test event', '2025-12-12 00:00:00', '2025-12-12 00:30:00', 'late night meditation');