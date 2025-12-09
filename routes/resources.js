// create router
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

router.get('/', function(req, res, next) {
    res.render("resources.ejs", {searchResult: null})
});

router.get('/bookmarks', function (req, res, next) {
    // redirect to login if not signed in
});

// Export the router object so index.js can access it
module.exports = router;