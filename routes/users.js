// include modules
const express = require("express");
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

router.get('/login', function (req, res, next) {
    res.render('login.ejs')
});

router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('./')
        }
        res.send('you are now logged out. <a href='+'./'+'>Home</a>')
    })
});

// export the router object so index.js can access it
module.exports = router;