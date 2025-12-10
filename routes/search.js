// create router
const express = require("express")
const router = express.Router()

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
        res.redirect('./users/login') // redirect to the login page
    } else {
        next (); // move to the next middleware function
    } 
}

router.get('/',function(req, res, next){
    res.render("search.ejs", {query_result: null});
});


router.get('/home_search',function(req, res, next){
    const sqlQuery = `SELECT username FROM users WHERE username = ?`; // query database to get all books id, prcices and names
    const username = req.query.home_search; // sanitise

    if (!username || username.trim() === "") {
        return res.render("search.ejs", {database_result: [{username: "your search was empty!"}], query_result: "your search was empty!"})
    };

    // execute sql query, search database
    db.query(sqlQuery, [username], (err, result) => {
        if (err) {
            next(err)
        };

        res.render("search.ejs", {database_result: result, query_result: req.query.home_search})
    });
});

// handle our routes
router.get('/result', function (req, res, next) {
    const sqlQuery = `SELECT username FROM users WHERE username = ?`; // query database to get all books id, prcices and names
    const username = req.query.search; // sanitise

    if (!username || username.trim() === "") {
        return res.render("search.ejs", {database_result: [{username: "your search was empty!"}], query_result: "your search was empty!"})
    };

    // execute sql query, search database
    db.query(sqlQuery, [username], (err, result) => {
        if (err) {
            next(err)
        }
        res.render("search.ejs", {database_result: result, query_result: req.query.search})
    });
});

// export  router object so index.js can access it
module.exports = router;