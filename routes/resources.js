// create router
const ejs = require("ejs");
const express = require("express");
const router = express.Router();

// possible room for more resource features!

router.get('/', function(req, res, next) {
    res.render("resources.ejs", {searchResult: null})
});

// Export the router object so index.js can access it
module.exports = router;