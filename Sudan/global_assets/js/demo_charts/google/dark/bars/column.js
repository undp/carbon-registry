/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - columns
 *
 *  Google Visualization column chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleColumnBasic = function() {


    //
    // Setup module components
    //

    // Column chart
    var _googleColumnBasic = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawColumn();

                // Resize on sidebar width change
               var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawColumn);

                // Resize on window resize
                var resizeColumn;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeColumn);
                    resizeColumn = setTimeout(function () {
                        drawColumn();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawColumn() {

            // Define charts element
            var line_chart_element = document.getElementById('google-column');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
            ]);


            // Options
            var options_column = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                backgroundColor: 'transparent',
                chartArea: {
                    left: '5%',
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
                    0: { color: '#2ec7c9' },
                    1: { color: '#b6a2de' }
                }
            };

            // Draw chart
            var column = new google.visualization.ColumnChart(line_chart_element);
            column.draw(data, options_column);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleColumnBasic();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleColumnBasic.init();
