/* ------------------------------------------------------------------------------
 *
 *  # Detailed task view
 *
 *  Demo JS code for task_manager_detailed.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var TaskManagerDetailed = function () {


    //
    // Setup components
    //

    // Datepicker
    var _componentUiDatepicker = function() {
        if (!$().datepicker) {
            console.warn('Warning - jQuery UI components are not loaded.');
            return;
        }

        // Datepicker
        $('.datepicker').datepicker({
            showOtherMonths: true,
            dateFormat: 'd MM, y'
        });


        // Inline datepicker
        $('.datepicker-inline').datepicker({
            showOtherMonths: true,
            defaultDate: '07/26/2015'
        });
    };

    // Summernote
    var _componentSummernote = function() {
        if (!$().summernote) {
            console.warn('Warning - summernote.min.js is not loaded.');
            return;
        }

        // Default initialization
        $('#add-comment').summernote();
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentUiDatepicker();
            _componentSummernote();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    TaskManagerDetailed.init();
});
