/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - donut chart
 *
 *  Google Visualization donut chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleDonutBasic = function() {


    //
    // Setup module components
    //

    // Donut chart
    var _googleDonutBasic = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawDonut();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawDonut);

                // Resize on window resize
                var resizeDonutBasic;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeDonutBasic);
                    resizeDonutBasic = setTimeout(function () {
                        drawDonut();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawDonut() {

            // Define charts element
            var donut_chart_element = document.getElementById('google-donut');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     11],
                ['Eat',      2],
                ['Commute',  2],
                ['Watch TV', 2],
                ['Sleep',    7]
            ]);

            // Options
            var options_donut = {
                fontName: 'Roboto',
                pieHole: 0.55,
                height: 300,
                width: 500,
                backgroundColor: 'transparent',
                colors: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980',
                    '#d87a80','#8d98b3','#e5cf0d','#97b552'
                ],
                chartArea: {
                    left: 50,
                    width: '90%',
                    height: '90%'
                }
            };
            
            // Instantiate and draw our chart, passing in some options.
            var donut = new google.visualization.PieChart(donut_chart_element);
            donut.draw(data, options_donut);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleDonutBasic();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleDonutBasic.init();
