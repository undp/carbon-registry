/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - 3D pie
 *
 *  Google Visualization 3D pie chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GooglePie3d = function() {


    //
    // Setup module components
    //

    // 3D pie chart
    var _googlePie3d = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawPie3d();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawPie3d);

                // Resize on window resize
                var resizePie3d;
                window.addEventListener('resize', function() {
                    clearTimeout(resizePie3d);
                    resizePie3d = setTimeout(function () {
                        drawPie3d();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawPie3d() {

            // Define charts element
            var pie_3d_element = document.getElementById('google-pie-3d');

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
            var options_pie_3d = {
                fontName: 'Roboto',
                is3D: true,
                height: 300,
                width: 540,
                backgroundColor: 'transparent',
                colors: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980',
                    '#d87a80','#8d98b3','#e5cf0d','#97b552'
                ],
                pieSliceBorderColor: '#353f53',
                chartArea: {
                    left: 50,
                    width: '95%',
                    height: '95%'
                },
                legend: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            };

            // Instantiate and draw our chart, passing in some options.
            var pie_3d = new google.visualization.PieChart(pie_3d_element);
            pie_3d.draw(data, options_pie_3d);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googlePie3d();
        }
    }
}();


// Initialize module
// ------------------------------

GooglePie3d.init();
