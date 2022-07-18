/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - chart combinations
 *
 *  Google Visualization combo chart demonstration
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var GoogleComboChart = function() {


    //
    // Setup module components
    //

    // Combo chart
    var _googleComboChart = function() {
        if (typeof google == 'undefined') {
            console.warn('Warning - Google Charts library is not loaded.');
            return;
        }

        // Initialize chart
        google.charts.load('current', {
            callback: function () {

                // Draw chart
                drawCombo();

                // Resize on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', drawCombo);

                // Resize on window resize
                var resizeCombo;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeCombo);
                    resizeCombo = setTimeout(function () {
                        drawCombo();
                    }, 200);
                });
            },
            packages: ['corechart']
        });

        // Chart settings
        function drawCombo() {

            // Define charts element
            var combo_chart_element = document.getElementById('google-combo');

            // Data
            var data = google.visualization.arrayToDataTable([
                ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
                ['2004/05',  165,      938,         522,             998,           450,      614.6],
                ['2005/06',  135,      1120,        599,             1268,          288,      682],
                ['2006/07',  157,      1167,        587,             807,           397,      623],
                ['2007/08',  139,      1110,        615,             968,           215,      609.4],
                ['2008/09',  136,      691,         629,             1026,          366,      569.6]
            ]);


            // Options
            var options_combo = {
                fontName: 'Roboto',
                height: 400,
                fontSize: 12,
                backgroundColor: 'transparent',
                seriesType: "bars",
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
                    1: { color: '#b6a2de' },
                    2: { color: '#5ab1ef' },
                    3: { color: '#8d98b3' },
                    4: { color: '#d87a80' },
                    5: {
                        type: "line",
                        pointSize: 7,
                        curveType: 'function',
                        color: '#f5994e'
                    }
                },
            };

            // Draw chart
            var combo = new google.visualization.ComboChart(combo_chart_element);
            combo.draw(data, options_combo);
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _googleComboChart();
        }
    }
}();


// Initialize module
// ------------------------------

GoogleComboChart.init();
