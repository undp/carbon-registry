/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - diff chart
 *
 *  Google Visualization diff chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleDiffChart = function() {


    //
    // Setup module components
    //

    // Diff chart
    var _googleDiffChart = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawDiff();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawDiff);

                // Resize on window resize
                var resizeDiffChart;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeDiffChart);
                    resizeDiffChart = setTimeout(function () {
                        drawDiff();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawDiff() {

            // Define charts element
            var diff_chart_element = document.getElementById('google-diff');

            // Old data
            var oldData = google.visualization.arrayToDataTable([
                ['Name', 'Popularity'],
                ['Cesar', 425],
                ['Rachel', 420],
                ['Patrick', 290],
                ['Eric', 620],
                ['Eugene', 520],
                ['John', 460],
                ['Greg', 420],
                ['Matt', 410]
            ]);

            // New data
            var newData = google.visualization.arrayToDataTable([
                ['Name', 'Popularity'],
                ['Cesar', 307],
                ['Rachel', 360],
                ['Patrick', 200],
                ['Eric', 550],
                ['Eugene', 460],
                ['John', 320],
                ['Greg', 390],
                ['Matt', 360]
            ]);

            // Options
            var options = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                backgroundColor: 'transparent',
                chartArea: {
                    left: '5%',
                    width: '94%',
                    height: 350
                },
                colors: ['#2ed88f'],
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        fontSize: 13
                    }
                },
                vAxis: {
                    title: 'Popularity',
                    titleTextStyle: {
                        fontSize: 13,
                        italic: false,
                        color: '#333'
                    },
                    textStyle: {
                        color: '#333'
                    },
                    baselineColor: '#ccc',
                    gridlines:{
                        color: '#eee',
                        count: 10
                    },
                    minValue: 0
                },
                hAxis: {
                    textStyle: {
                        color: '#333'
                    }
                },
                legend: {
                    position: 'top',
                    alignment: 'center',
                    textStyle: {
                        color: '#333'
                    }
                }
            };

            // Attach chart to the DOM element
            var diff = new google.visualization.ColumnChart(diff_chart_element);

            // Set data
            var diffData = diff.computeDiff(oldData, newData);

            // Draw our chart, passing in some options
            diff.draw(diffData, options);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleDiffChart();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleDiffChart.init();
