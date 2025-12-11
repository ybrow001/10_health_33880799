// create new router
const ejs = require("ejs");
const express = require("express");
const router = express.Router();

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
        res.redirect('../users/login') // redirect to the login page
    } else {
        next (); 
    } 
};

// view calendar, redirected to login if not signed in
router.get('/calendar', redirectLogin, function(req, res, next){
    res.render("calendar.ejs")
});

// view personal calendar
router.get('/calendar/events', redirectLogin, function(req, res, next){
    const userId = req.session.userId;
    const sqlQuery = 'SELECT event_title, event_start, event_end, event_description FROM calendar WHERE user_id = ?';

    db.query(sqlQuery, [userId], (err, result) => {
        if(err) {
            next(err);
            return;
        };

        // send FullCalendar an array of data
        const events = result.map(event => ({ 
            // create array "events" by mapping database query results onto key-value pairs
            id: event.id,
            title: event.event_title,
            start: event.event_start,
            end: event.event_end,
            description: event.event_description
        }));

        res.json(events); // send JSON array
    });
});

// add event to calendar
router.post('/calendar/events', redirectLogin, function(req, res, next){
    const userId = req.session.userId;
    const title = req.body.title;
    const start =  req.body.start;
    const end = req.body.end;
    const description = req.body.description;

    const sqlQuery = 'INSERT INTO calendar (user_id, event_title, event_start, event_end, event_description) VALUES (?,?,?,?,?)';

    db.query(sqlQuery, [userId, title, start, end, description], (err, result) => {
        if(err) {
            next(err);
            return;
        };

        res.json({ // send data as json to FullCalendar front end
            eventId: result.insertId,
            title,
            start,
            end,
            description
        }); 
    });
});

router.get('/timer', function (req, res, next) {
    res.render("timer.ejs");
});

// export the router object so index.js can access it
module.exports = router;