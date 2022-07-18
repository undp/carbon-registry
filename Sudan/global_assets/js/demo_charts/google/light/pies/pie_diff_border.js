/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - diff pie
 *
 *  Google Visualization diff pie chart with border factor demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GooglePieDiffBorder = function() {


    //
    // Setup module components
    //

    // Pie with border factor
    var _googlePieDiffBorder = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawPieDiffBorder();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawPieDiffBorder);

                // Resize on window resize
                var resizePieDiffBorder;
                window.addEventListener('resize', function() {
                    clearTimeout(resizePieDiffBorder);
                    resizePieDiffBorder = setTimeout(function () {
                        drawPieDiffBorder();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawPieDiffBorder() {

            // Define charts element
            var pie_diff_border_element = document.getElementById('google-pie-diff-border');

            // Old data set
            var oldData = google.visualization.arrayToDataTable([
                ['Major', 'Degrees'],
                ['Business', 256070], ['Education', 108034],
                ['Social Sciences & History', 127101], ['Health', 81863],
                ['Psychology', 74194]
            ]);

            // New data set
            var newData = google.visualization.arrayToDataTable([
                ['Major', 'Degrees'],
                ['Business', 358293], ['Education', 101265],
                ['Social Sciences & History', 172780], ['Health', 129634],
                ['Psychology', 97216]
            ]);

            // Options
            var options = {
                fontName: 'Roboto',
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
                },
                diff: {
                    innerCircle: {
                        borderFactor: 0.08
                    }
                }
            };

            // Attach chart to the DOM element
            var chartRadius = new google.visualization.PieChart(pie_diff_border_element);

            // Set data
            var diffData = chartRadius.computeDiff(oldData, newData);

            // Draw our chart, passing in some options
            chartRadius.draw(diffData, options);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googlePieDiffBorder();
        }
    }
}();


// Initialize module
// ------------------------------

GooglePieDiffBorder.init();
