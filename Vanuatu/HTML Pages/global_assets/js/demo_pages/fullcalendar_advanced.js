/* ------------------------------------------------------------------------------
 *
 *  # Fullcalendar advanced options
 *
 *  Demo JS code for extra_fullcalendar_advanced.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var FullCalendarAdvanced = function() {


    //
    // Setup module components
    //

    // External events
    var _componentFullCalendarEvents = function() {
        if (typeof FullCalendar == 'undefined' || typeof Switchery == 'undefined') {
            console.warn('Warning - Fullcalendar or Switchery files are not loaded.');
            return;
        }


        //
        // External events
        //

        // Define components
        var Calendar = FullCalendar.Calendar;
        var Draggable = FullCalendarInteraction.Draggable;

        // Define elements
        var calendarEventsContainerElement = document.getElementById('external-events');
        var calendarEventsElement = document.querySelector('.fullcalendar-external');

        // Add switcher for events removal
        var checkboxElement = document.getElementById('drop-remove');
        var checkboxInit = new Switchery(checkboxElement);

        // Use custom colors for external events
        var two = calendarEventsContainerElement.querySelectorAll('.fc-event');
        two.forEach(function(element) {
            element.style.borderColor = element.getAttribute('data-color');
            element.style.backgroundColor = element.getAttribute('data-color');
        });

        // Initialize
        if(calendarEventsElement) {

            // Initialize the external events
            new Draggable(calendarEventsContainerElement, {
                itemSelector: '.fc-event',
                eventData: function(eventEl) {
                    return {
                        title: eventEl.innerText,
                        color: eventEl.getAttribute('data-color'),
                    };
                }
            });


            // Initialize the calendar
            var calendarEventsInit = new Calendar(calendarEventsElement, {
                plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                defaultDate: '2014-11-12',
                events: [
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
                ],
                drop: function(info) {
                    if (checkboxElement.checked) {
                        info.draggedEl.parentNode.removeChild(info.draggedEl);
                    }
                }
            }).render();
        }
    };

    // FullCalendar RTL direction
    var _componentFullCalendarRTL = function() {
        if (typeof FullCalendar == 'undefined') {
            console.warn('Warning - Fullcalendar files are not loaded.');
            return;
        }


        //
        // RTL direction
        //

        // Define element
        var calendarRTLElement = document.querySelector('.fullcalendar-rtl');

        // Initialize
        if(calendarRTLElement) {
            var calendarRTLInit = new FullCalendar.Calendar(calendarRTLElement, {
                plugins: [ 'dayGrid', 'timeGrid', 'interaction' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                defaultDate: '2014-11-12',
                defaultView: 'dayGridMonth',
                editable: true,
                businessHours: true,
                events: [
                    {
                        title: 'All Day Event',
                        start: '2014-11-01'
                    },
                    {
                        title: 'Long Event',
                        start: '2014-11-07',
                        end: '2014-11-10'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2014-11-09T16:00:00'
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
                        title: 'Meeting',
                        start: '2014-11-12T14:30:00'
                    },
                    {
                        title: 'Happy Hour',
                        start: '2014-11-12T17:30:00'
                    },
                    {
                        title: 'Dinner',
                        start: '2014-11-12T20:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2014-11-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2014-11-28'
                    }
                ],
                locale: 'ar'
            }).render();
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentFullCalendarEvents();
            _componentFullCalendarRTL();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    FullCalendarAdvanced.init();
});
