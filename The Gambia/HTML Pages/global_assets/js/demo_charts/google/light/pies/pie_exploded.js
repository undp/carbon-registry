/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - sliced pie
 *
 *  Google Visualization sliced pie chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GooglePieExploded = function() {


    //
    // Setup module components
    //

    // Exploded pie
    var _googlePieExploded = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawExplodedPie();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawExplodedPie);

                // Resize on window resize
                var resizePieExploded;
                window.addEventListener('resize', function() {
                    clearTimeout(resizePieExploded);
                    resizePieExploded = setTimeout(function () {
                        drawExplodedPie();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawExplodedPie() {

            // Define charts element
            var pie_exploded_element = document.getElementById('google-pie-exploded');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Language', 'Speakers (in millions)'],
                ['Assamese', 13],
                ['Bengali', 83],
                ['Gujarati', 46],
                ['Hindi', 90],
                ['Kannada', 38],
                ['Maithili', 20],
                ['Malayalam', 33],
                ['Marathi', 72],
                ['Oriya', 33],
                ['Punjabi', 29],
                ['Tamil', 61],
                ['Telugu', 74],
                ['Urdu', 52]
            ]);

            // Options
            var options = {
                fontName: 'Roboto',
                height: 300,
                width: 540,
                backgroundColor: 'transparent',
                colors: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ],
                chartArea: {
                    left: 50,
                    width: '90%',
                    height: '90%'
                },
                pieSliceText: 'label',
                slices: {
                    2: {offset: 0.15},
                    8: {offset: 0.1},
                    10: {offset: 0.15},
                    11: {offset: 0.1}
                }
            };

            // Instantiate and draw our chart, passing in some options.
            var pie_exploded = new google.visualization.PieChart(pie_exploded_element);
            pie_exploded.draw(data, options);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googlePieExploded();
        }
    }
}();


// Initialize module
// ------------------------------

GooglePieExploded.init();
