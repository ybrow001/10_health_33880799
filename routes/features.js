// create new router
const ejs = require("ejs");
const express = require("express");
const router = express.Router();

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
        res.redirect('../users/login') // redirect to the login page
    } else {
        next (); // move to the next middleware function
    } 
}

router.get('/calendar',function(req, res, next){
    res.render("calendar.ejs", {searchResult: null})
    // redirect to login if not signed in
});

router.get('/timer', function (req, res, next) {
    // no login needed to use
});

// -- add timer preferences for individual users - new page or injected into timer.ejs?

// Export the router object so index.js can access it
module.exports = router;