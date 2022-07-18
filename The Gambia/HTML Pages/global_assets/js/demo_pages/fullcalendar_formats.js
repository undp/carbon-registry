/* ------------------------------------------------------------------------------
 *
 *  # Fullcalendar time and language options
 *
 *  Demo JS code for extra_fullcalendar_formats.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var FullCalendarFormats = function() {


    //
    // Setup module components
    //

    // FullCalendar formats examples
    var _componentFullCalendarFormats = function() {
        if (typeof FullCalendar == 'undefined') {
            console.warn('Warning - Fullcalendar files are not loaded.');
            return;
        }


        //
        // Date formats
        //

        // Define element
        var calendarFormatElement = document.querySelector('.fullcalendar-formats');

        // Initialize
        if(calendarFormatElement) {
            var calendarFormatInit = new FullCalendar.Calendar(calendarFormatElement, {
                plugins: [ 'dayGrid', 'interaction' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                },
                views: {
                    month: {
                        titleFormat: { year: 'numeric', month: 'long' },
                        columnHeaderFormat: {
                            weekday: 'long'
                        }
                    },
                    week: {
                        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
                        columnHeaderFormat: {
                            weekday: 'short'
                        }
                    },
                    day: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
                        columnHeaderFormat: {
                            weekday: 'short'
                        }
                    }
                },
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                },
                defaultDate: '2014-11-12',
                editable: true,
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
                ]
            }).render();
        }


        //
        // Localization
        //

        // Default locale
        var initialLocaleCode = 'en';

        // Define elements
        var calendarLocaleSelectorElement = document.getElementById('lang-selector');
        var calendarLocaleElement = document.querySelector('.fullcalendar-languages');

        // Initialize
        if(calendarLocaleElement) {
            var calendarLocaleInit = new FullCalendar.Calendar(calendarLocaleElement, {
                plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridMonth,timeGridDay,listMonth'
                },
                locale: initialLocaleCode,
                buttonIcons: false, // show the prev/next text
                weekNumbers: true,
                editable: true,
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
                ]
            });

            calendarLocaleInit.render();


            // Build the locale selector's options
            calendarLocaleInit.getAvailableLocaleCodes().forEach(function(localeCode) {
                var optionEl = document.createElement('option');
                optionEl.value = localeCode;
                optionEl.selected = localeCode == initialLocaleCode;
                optionEl.innerText = localeCode;
                calendarLocaleSelectorElement.appendChild(optionEl);
            });

            // When the selected option changes, dynamically change the calendar option (jQuery, because of Select2)
            $(calendarLocaleSelectorElement).on('change', function (e) { 
                if (this.value) {
                    calendarLocaleInit.setOption('locale', this.value);
                }
            });
        }
    };

    // Select2 select
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }

        // We're using Select2 for language select
        $('.form-control-select2').select2({
            width: 100,
            minimumResultsForSearch: Infinity
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentFullCalendarFormats();
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    FullCalendarFormats.init();
});
