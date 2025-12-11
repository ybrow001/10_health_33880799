# 10_health_33880799

## mustardseed

mustardseed is a dynamic web application that collects together resources, customisable tools and community features for use in meditation practice.

## install and run

To install and run this application, in the command line on the machine it is being run on, execute the commands:

- git clone https://github.com/ybrow001/10_health_33880799

To install the necessary modules and packages - automatically specified by the accompanying .json files:
- npm install


MySql2 must be installed on the machine. In the mysql command line execu the following commands to set up the database: 
- source create_db.sql
 
... and insert test data into the database:
- source insert_test_data.sql

Finally, to run the application locally:
- node index.js

Node modules in use:
- express
- ejs
- mysql2
- express-session
- express-sanitizer
- express-validator
- bcrypt