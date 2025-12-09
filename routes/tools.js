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

router.get('/general',function(req, res, next){ 
    // link to page with preview of timer and calendar or prompt to sign up to use calendar
    res.render("tools.ejs")
});

router.get('/calendar',function(req, res, next){
    res.render("calendar.ejs")
    // view of calendar with prompt to sign in?
});

// view personal calendar
router.get('/calendar/events', redirectLogin, function(req, res, next){
    res.render("calendar.ejs")
    // redirect to login if not signed in
});

// add event to calendar
router.post('/calendar/events', redirectLogin, function(req, res, next){
    res.render("calendar.ejs")
    // redirect to login if not signed in
});

// delete event from calendar
router.delete('/calendar/events/:id', redirectLogin, function(req, res, next){
    res.render("calendar.ejs")
    // redirect to login if not signed in
});

router.get('/timer', function (req, res, next) {
    res.render("timer.ejs");
});

router.get('/mytimer', redirectLogin, function(req, res, next) {
    // login required, show users saved time preferences
});

// -- add timer preferences for individual users - new page or injected into timer.ejs?

// Export the router object so index.js can access it
module.exports = router;