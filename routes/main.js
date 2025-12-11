// create router
const express = require("express")
const router = express.Router()

// handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

// export  router object so index.js can access it
module.exports = router;