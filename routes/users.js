// include modules
const express = require('express');
const router = express.Router(); // create a new router
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator');

const shopData = {shopName: "mustardseed"};

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
        res.redirect('./login') // redirect to the login page
    } else {
        next (); // move to the next middleware function
    } 
}

router.get('/signup', function (req, res, next) {
    res.render('signup.ejs')
});

// add signedup w redirect to user profile (if auto log in) OR to login page
router.post('/signedup', [
    body('username') // santise username to avoid XSS
      .trim()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage('username must be 4-20 characters long'),
    body('password') // secure password check
      .isStrongPassword({
        minLength: 4,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'password must be at least 4 characters long, including one each of uppercase, lowercase, number, and symbol'
      ),
    body('email') // ensure email is valid then sanitise
      .trim()
      .isEmail()
      .normalizeEmail(),
  ],
function (req, res, next) {
    // saving data in database
    const saltRounds = 10;
    const plainPassword = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./signup');
    } else {
        // encrypt password
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { 
            // store hashed password in your database.
            if(err) {
                next(err);
            }

            const sqlQuery = 'INSERT INTO users (username, hashed_password, email) VALUES (?,?,?)';
            const newRecord = [req.body.username, hashedPassword, req.body.email];

            db.query(sqlQuery, newRecord, (err, result) => {
                if(err) {
                    next(err)
                } else {
                    res.send(`
                        <!doctype html>
                        <html>
                            <head>
                                <title>${shopData.shopName} welcome</title>
                                <link rel="stylesheet"  type="text/css" href="/main.css" />
                            </head>
                            <body>
                                <h1>${shopData.shopName}</h1>
                                <p> hello, ${req.body.username}! welcome to ${shopData.shopName}! thank you for signing up!</p>
                                <a href="/"> return home :) </a>
                            </body>
                        </html>
                    `);
                }
            });  
        })
    }                                                                
}); 

router.get('/login', function (req, res, next) {
    res.render('login.ejs', {message: null});
});

router.post('/loggedin', [
    body('username').isLength({min: 4, max: 20}),
    body('password') // secure password check
      .isStrongPassword({
        minLength: 4,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'password must be at least 4 characters, including one each of uppercase, lowercase, number, and symbol'
      ),
],
function (req, res, next) {
    let username = req.body.username;
    let plainPassword = req.body.password;
    let sqlQuery = 'SELECT id, hashed_password FROM users WHERE username=?';

    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./login', {message: 'the login credentials entered were incorrect or missing, please try again or make an account on our registration page :)'});
    } else {
        db.query(sqlQuery, [username], (err, rows) => {
            if(err) {
                next(err)
            } else {
                const userId = rows[0].id; // for use in session id
                const hash = rows[0].hashed_password;
            
                bcrypt.compare(plainPassword, hash, function(err, result) {
                    if(err) {
                        next(err)
                    } else if(result == true) {
                        req.session.userId = userId;
                        res.render('index.ejs', {message: null}); // redirect to home page
                    } else {
                        // redirect to login page, inject message
                        res.render('login.ejs', {message: 'the login credentials entered were incorrect or missing, please try again or make an account on our registration page :)'});
                    }   
                })
            }
        })
    }  
});

router.get('/logout', redirectLogin, (req,res) => {
    // terminate and destroy user session
    req.session.destroy(err => { 
        if(err) {
            return res.redirect('./')
        }
        // confirm logout, provide link back to home page
        res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>${shopData.shopName} log out</title>
                    <link rel="stylesheet"  type="text/css" href="/main.css" />
                </head>
                <body>
                    <h1>${shopData.shopName}</h1>
                    <p>you've now been logged out, we're sad to see you go!</p>
                    <a href="/"> return home :) </a>
                </body>
            </html>
        `);
    })
});

// export the router object so index.js can access it
module.exports = router;