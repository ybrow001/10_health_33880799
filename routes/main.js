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

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

// router.get('/home_search',function(req, res, next){
//     res.render("search.ejs", {searchResult: req.query.home_search})
// });

// router.get('/search/result', function (req, res, next) {
//     let sqlQuery = `SELECT id, price, name FROM books`; // query database to get all books id, prcices and names
//     // execute sql query

//     //searching in the database
//     // db.query(sqlQuery, (err, result) => {
//     //     if (err) {
//     //         next(err)
//     //     }
//     //     res.render("search.ejs", {result: result, searchResult: req.query.search})
//     // });

//     res.render("search.ejs", {result: result, searchResult: req.query.search})
// });

// -- inlcude registration, login, logout in main?

// export  router object so index.js can access it
module.exports = router;