// create router
const express = require("express")
const router = express.Router()

router.get('/',function(req, res, next){
    res.render("search.ejs", {query_result: null});
});

// for home page search bar
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

        // redirect to main search page
        res.render("search.ejs", {database_result: result, query_result: req.query.home_search})
    });
});

// for main search page
router.get('/result', function (req, res, next) {
    const sqlQuery = `SELECT username FROM users WHERE username = ?`; // query database to get all books id, prcices and names
    const username = req.query.search; // sanitise

    // handle empty searches and results
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