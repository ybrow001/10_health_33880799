// include modules
const express = require('express');
const router = express.Router(); // create a new router
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator');

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
    body('username').trim().isLength({min: 4, max: 20}).withMessage('must be 5-20 characters long'),
    body('password').isLength({min: 4, max: 20}).withMessage('must be 8-24 characters long'),
    body('email').trim().isEmail() /* .normalizeEmail() - removed to allow example emails */, 
],
    // due to sanitising before storing in database, if the resulting name is too long for VARCHAR(50) error is thrown
    // to improve increase size of VARCHAR or change data type
function (req, res, next) {
    // saving data in database
    const saltRounds = 10;
    const plainPassword = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./signup');
    } else {
        // bcrypt.hash() is an async func - so db.queury must be run inside it to store the hashed password
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { 
            // Store hashed password in your database.
            if(err) {
                next(err);
            }

            const sqlQuery = 'INSERT INTO users (username, hashed_password, email) VALUES (?,?,?)';
            const newRecord = [req.body.username, hashedPassword, req.body.email];

            db.query(sqlQuery, newRecord, (err, result) => {
                if(err) {
                    next(err)
                } else {

                    // -- direct to welcome page, user can navigate from there clearly

                    result = `hello ${req.body.username} you are now registered! we will send you an email at ${req.body.email}. 
                    your password is: ${req.body.password}, your hashed password is: ${hashedPassword}.`;
                    res.send(result)
                }
            });  
        })
    }                                                                
}); 

router.get('/login', function (req, res, next) {
    res.render('login.ejs')
});

router.post('/loggedin', [
    check('username').isLength({min: 4, max: 20}),
    check('password').isLength({min: 4, max: 50})
],
function (req, res, next) {
    let username = req.body.username;
    let plainPassword = req.body.password;
    let sqlQuery = 'SELECT hashed_password FROM users WHERE username=?';

    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./login');
    } else {
        db.query(sqlQuery, [username], (err, rows) => {
            if(err) {
                next(err)
            } else {
                let hash = rows[0].hashed_password;
            
                bcrypt.compare(plainPassword, hash, function(err, result) {
                    if(err) {
                        next(err)
                    } else if(result == true) {
                        let sanitisedUsername = req.sanitize(username); 
                        // sanitise username before creating session and before displaying
                        // maybe necessary for session - needed if displaying

                        req.session.userId = sanitisedUsername;
                        res.send(`hello ${sanitisedUsername}, your login was successful!`)
                        // render user profile
                    } else {
                        // redirect to login page, inject message
                        res.send(`the login credentials entered were incorrect, please try again or make an account on our registration page :)`)
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
        res.send("you've now been looged out")
    })
});

// export the router object so index.js can access it
module.exports = router;