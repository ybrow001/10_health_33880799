// include modules
var express = require ('express');
var ejs = require('ejs');
var mysql = require('mysql2');
var session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const path = require('path');

// create the express application object
const app = express();
const port = 8000;

// create an input sanitizer
app.use(expressSanitizer());

// create a session
app.use(session({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// use ejs as templating engine
app.set('view engine', 'ejs');

// set up body parser 
app.use(express.urlencoded({ extended: true }));

// link public folder
app.use(express.static(path.join(__dirname, 'public')));

// application data
app.locals.shopData = {shopName: "mustardseed"};

// database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: '',
    password: 'qwertyuiop',
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
global.db = db;

// load route handlers
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// -- use /users but keep limited to individuals users for their own profiles?
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// -- use /resources to link information about meditation, sutras, etc?
const resourceRoutes = require('./routes/resources');
app.use('/resources', resourceRoutes);

const featureRoutes = require('./routes/features');
app.use('/features', featureRoutes);

// start listening on given port
app.listen(port, () => console.log(`listening on port ${port}`));