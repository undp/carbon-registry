/* ------------------------------------------------------------------------------
 *
 *  # Fullcalendar basic options
 *
 *  Demo JS code for extra_fullcalendar_styling.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var FullCalendarStyling = function() {


    //
    // Setup module components
    //

    // External events
    var _componentFullCalendarStyling = function() {
        if (typeof FullCalendar == 'undefined') {
            console.warn('Warning - Fullcalendar files are not loaded.');
            return;
        }


        // Add events
        // ------------------------------

        // Event colors
        var eventColors = [
            {
                title: 'All Day Event',
                start: '2014-11-01',
                color: '#EF5350'
            },
            {
                title: 'Long Event',
                start: '2014-11-07',
                end: '2014-11-10',
                color: '#26A69A'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-09T16:00:00',
                color: '#26A69A'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-16T16:00:00',
                color: '#5C6BC0'
            },
            {
                title: 'Conference',
                start: '2014-11-11',
                end: '2014-11-13',
                color: '#546E7A'
            },
            {
                title: 'Meeting',
                start: '2014-11-12T10:30:00',
                end: '2014-11-12T12:30:00',
                color: '#546E7A'
            },
            {
                title: 'Lunch',
                start: '2014-11-12T12:00:00',
                color: '#546E7A'
            },
            {
                title: 'Meeting',
                start: '2014-11-12T14:30:00',
                color: '#546E7A'
            },
            {
                title: 'Happy Hour',
                start: '2014-11-12T17:30:00',
                color: '#546E7A'
            },
            {
                title: 'Dinner',
                start: '2014-11-12T20:00:00',
                color: '#546E7A'
            },
            {
                title: 'Birthday Party',
                start: '2014-11-13T07:00:00',
                color: '#546E7A'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2014-11-28',
                color: '#FF7043'
            }
        ];

        // Event background colors
        var eventBackgroundColors = [
            {
                title: 'All Day Event',
                start: '2014-11-01'
            },
            {
                title: 'Long Event',
                start: '2014-11-07',
                end: '2014-11-10',
                color: '#DCEDC8',
                rendering: 'background'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-06T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2014-11-11',
                end: '2014-11-13'
            },
            {
                title: 'Meeting',
                start: '2014-11-12T10:30:00',
                end: '2014-11-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2014-11-12T12:00:00'
            },
            {
                title: 'Happy Hour',
                start: '2014-11-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2014-11-24T20:00:00'
            },
            {
                title: 'Meeting',
                start: '2014-11-03T10:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2014-11-13T07:00:00'
            },
            {
                title: 'Vacation',
                start: '2014-11-27',
                end: '2014-11-30',
                color: '#FFCCBC',
                rendering: 'background'
            }
        ];


        // Initialization
        // ------------------------------

        //
        // Event colors
        //

        // Define element
        var calendarEventColorsElement = document.querySelector('.fullcalendar-event-colors');

        // Initialize
        if(calendarEventColorsElement) {
            var calendarEventColorsInit = new FullCalendar.Calendar(calendarEventColorsElement, {
                plugins: [ 'dayGrid', 'interaction' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                },
                defaultDate: '2014-11-12',
                editable: true,
                events: eventColors
            }).render();
        }


        //
        // Event background colors
        //

        // Define element
        var calendarEventBgColorsElement = document.querySelector('.fullcalendar-background-colors');

        // Initialize
        if(calendarEventBgColorsElement) {
            var calendarEventBgColorsInit = new FullCalendar.Calendar(calendarEventBgColorsElement, {
                plugins: [ 'dayGrid', 'interaction' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                },
                defaultDate: '2014-11-12',
                editable: true,
                events: eventBackgroundColors
            }).render();
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentFullCalendarStyling();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    FullCalendarStyling.init();
});
