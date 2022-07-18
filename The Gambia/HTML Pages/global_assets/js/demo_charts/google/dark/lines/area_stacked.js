/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - stacked area
 *
 *  Google Visualization stacked area chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleAreaStacked = function() {


    //
    // Setup module components
    //

    // Stacked area chart
    var _googleAreaStacked = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawAreaStackedChart();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawAreaStackedChart);

                // Resize on window resize
                var resizeAreaStacked;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeAreaStacked);
                    resizeAreaStacked = setTimeout(function () {
                        drawAreaStackedChart();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawAreaStackedChart() {

            // Define charts element
            var area_stacked_element = document.getElementById('google-area-stacked');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Cars', 'Trucks', 'Drones', 'Segways'],
                ['2013',  870,  460, 310, 220],
                ['2014',  460,   720, 220, 460],
                ['2015',  930,  640, 340, 330],
                ['2016',  1000,  400, 180, 500]
            ]);

            // Options
            var options_area_stacked = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                areaOpacity: 0.25,
                chartArea: {
                    left: '5%',
                    width: '94%',
                    height: 350
                },
                isStacked: true,
                pointSize: 7,
                backgroundColor: 'transparent',
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        fontSize: 13
                    }
                },
                lineWidth: 1.5,
                vAxis: {
                    title: 'Number values',
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
                    gridarea:{
                        count: 10
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
                    0: { color: '#2ec7c9' },
                    1: { color: '#b6a2de' },
                    2: { color: '#5ab1ef' },
                    3: { color: '#ffb980' }
                }
            };

            // Draw chart
            var area_stacked_chart = new google.visualization.AreaChart(area_stacked_element);
            area_stacked_chart.draw(data, options_area_stacked);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleAreaStacked();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleAreaStacked.init();
