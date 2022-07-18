/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - stacked bars
 *
 *  Google Visualization stacked bar chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleBarStacked = function() {


    //
    // Setup module components
    //

    // Stacked bar chart
    var _googleBarStacked = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawBarStacked();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawBarStacked);

                // Resize on window resize
                var resizeBarStacked;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeBarStacked);
                    resizeBarStacked = setTimeout(function () {
                        drawBarStacked();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawBarStacked() {

            // Define charts element
            var bar_stacked_element = document.getElementById('google-bar-stacked');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General', 'Western', 'Literature', { role: 'annotation' } ],
                ['2000', 20, 30, 35, 40, 45, 30, ''],
                ['2005', 14, 20, 25, 30, 48, 30, ''],
                ['2010', 10, 24, 20, 32, 18, 5, ''],
                ['2015', 15, 25, 30, 35, 20, 15, ''],
                ['2020', 16, 22, 23, 30, 16, 9, ''],
                ['2025', 12, 26, 20, 40, 20, 30, ''],
                ['2030', 28, 19, 29, 30, 12, 13, '']
            ]);


            // Options
            var options_bar_stacked = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                backgroundColor: 'transparent',
                chartArea: {
                    left: '3%',
                    width: '95%',
                    height: 350
                },
                isStacked: true,
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        fontSize: 13
                    }
                },
                vAxis: {
                    textStyle: {
                        color: '#333'
                    }
                },
                hAxis: {
                    baselineColor: '#ccc',
                    textStyle: {
                        color: '#333'
                    },
                    gridlines:{
                        color: '#eee',
                        count: 10
                    },
                    minValue: 0
                },
                legend: {
                    position: 'top',
                    alignment: 'center',
                    textStyle: {
                        color: '#333'
                    }
                },
                series: {
                    0: { color: '#2ec7c9' },
                    1: { color: '#b6a2de' },
                    2: { color: '#5ab1ef' },
                    3: { color: '#ffb980' },
                    4: { color: '#d87a80' },
                    5: { color: '#8d98b3' }
                }
            };

            // Draw chart
            var bar_stacked = new google.visualization.BarChart(bar_stacked_element);
            bar_stacked.draw(data, options_bar_stacked);
        }

    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleBarStacked();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleBarStacked.init();
