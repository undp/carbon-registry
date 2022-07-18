/* ------------------------------------------------------------------------------
 *
 *  # Timelines
 *
 *  Demo JS code for Timeline pages set
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var Timelines = function() {


    //
    // Setup module components
    //

    // Schedule
    var _componentFullCalendar = function() {
        if (typeof FullCalendar == 'undefined') {
            console.warn('Warning - Fullcalendar files are not loaded.');
            return;
        }

        // Add events
        var eventColors = [
            {
                title: 'Day off',
                start: '2014-11-01',
                color: '#DB7272'
            },
            {
                title: 'University',
                start: '2014-11-07',
                end: '2014-11-10',
                color: '#42A5F5'
            },
            {
                id: 999,
                title: 'Shopping',
                start: '2014-11-09T13:00:00',
                color: '#8D6E63'
            },
            {
                id: 999,
                title: 'Shopping',
                start: '2014-11-15T16:00:00',
                color: '#00BCD4'
            },
            {
                title: 'Conference',
                start: '2014-11-11',
                end: '2014-11-13',
                color: '#26A69A'
            },
            {
                title: 'Meeting',
                start: '2014-11-14T08:30:00',
                end: '2014-11-14T12:30:00',
                color: '#7986CB'
            },
            {
                title: 'Meeting',
                start: '2014-11-11T09:30:00',
                color: '#78909C'
            },
            {
                title: 'Happy Hour',
                start: '2014-11-12T14:30:00',
                color: '#26A69A'
            },
            {
                title: 'Dinner',
                start: '2014-11-13T19:00:00',
                color: '#FF7043'
            },
            {
                title: 'Birthday Party',
                start: '2014-11-13T03:00:00',
                color: '#4CAF50'
            }
        ];

        // Define element
        var myScheduleElement = document.querySelector('.my-schedule');

        // Initialize
        if(myScheduleElement) {
            var myScheduleInit = new FullCalendar.Calendar(myScheduleElement, {
                plugins: [ 'dayGrid', 'timeGrid', 'interaction' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                defaultDate: '2014-11-12',
                defaultView: 'timeGridWeek',
                businessHours: true,
                events: eventColors
            }).render();
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentFullCalendar();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    Timelines.init();
});
