/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - lines
 *
 *  Google Visualization line chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleLineBasic = function() {


    //
    // Setup module components
    //

    // Line chart
    var _googleLineBasic = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawLineChart();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawLineChart);

                // Resize on window resize
                var resizeLineBasic;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeLineBasic);
                    resizeLineBasic = setTimeout(function () {
                        drawLineChart();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawLineChart() {

            // Define charts element
            var line_chart_element = document.getElementById('google-line');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
            ]);

            // Options
            var options = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                chartArea: {
                    left: '5%',
                    width: '94%',
                    height: 350
                },
                pointSize: 7,
                curveType: 'function',
                backgroundColor: 'transparent',
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        fontSize: 13
                    }
                },
                vAxis: {
                    title: 'Sales and Expenses',
                    titleTextStyle: {
                        fontSize: 13,
                        italic: false,
                        color: '#fff'
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    baselineColor: '#697692',
                    gridlines:{
                        color: '#4b5975',
                        count: 10
                    },
                    minorGridlines: {
                        color: '#3e495f'
                    },
                    minValue: 0
                },
                hAxis: {
                    textStyle: {
                        color: '#fff'
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
                    0: { color: '#EF5350' },
                    1: { color: '#66BB6A' }
                }
            };

            // Draw chart
            var line_chart = new google.visualization.LineChart(line_chart_element);
            line_chart.draw(data, options);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleLineBasic();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleLineBasic.init();

