document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');

    // class loaded from FullCalendar
    const calendar = new FullCalendar.Calendar(calendarElement, {
        initialView: 'dayGridMonth',
        events: "./calendar/events",  // load events using GET route
        selectable: true,
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24 hour time
        },
    });
    calendar.render();

    // displays form when a day in the calendar is clicked
    calendar.on('dateClick', function(info) {
        const modal = document.getElementById('event_modal');
        modal.style.display = 'block';
        
        document.getElementById('event_start').value = info.dateStr + 'T00:00'; // default start
    });

    document.getElementById('save_button').addEventListener('click', function() {
        const title = document.getElementById('event_title').value;
        const start = document.getElementById('event_start').value;
        const end = document.getElementById('event_end').value;
        const description = document.getElementById('event_description').value;

        fetch('./calendar/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, start, end, description})
        })
        // fetch is an asynchronous promise, .then tells it (a promise) what to do next
        .then(res => res.json()) // get res.json from route handlers
        .then(savedEvent => {
            calendar.addEvent({
                id: savedEvent.eventId,
                title: title,
                start: start,
                end: end,
                description: description
            });

            // hide reset form
            document.getElementById('event_modal').style.display = 'none';
            document.getElementById('event_title').value = '';
            document.getElementById('event_description').value = '';
            document.getElementById('event_start').value = '';
            document.getElementById('event_end').value = '';
        });
    });
});