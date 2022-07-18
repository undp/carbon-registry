/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - bars
 *
 *  Google Visualization bar chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleBarBasic = function() {


    //
    // Setup module components
    //

    // Bar chart
    var _googleBarBasic = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawBar();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawBar);

                // Resize on window resize
                var resizeBarBasic;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeBarBasic);
                    resizeBarBasic = setTimeout(function () {
                        drawBar();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawBar() {

            // Define charts element
            var bar_chart_element = document.getElementById('google-bar');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
            ]);


            // Options
            var options_bar = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                backgroundColor: 'transparent',
                chartArea: {
                    left: '3%',
                    width: '95%',
                    height: 350
                },
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        fontSize: 13
                    }
                },
                vAxis: {
                    textStyle: {
                        color: '#fff'
                    },
                    gridlines:{
                        count: 10
                    },
                    minValue: 0
                },
                hAxis: {
                    baselineColor: '#697692',
                    textStyle: {
                        color: '#fff'
                    },
                    gridlines:{
                        color: '#4b5975'
                    },
                    minorGridlines: {
                        color: '#3e495f'
                    }
                },
                legend: {
                    position: 'top',
                    alignment: 'center',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                series: {
                    0: { color: '#ffb980' },
                    1: { color: '#66BB6A' }
                }
            };

            // Draw chart
            var bar = new google.visualization.BarChart(bar_chart_element);
            bar.draw(data, options_bar);

        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleBarBasic();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleBarBasic.init();
