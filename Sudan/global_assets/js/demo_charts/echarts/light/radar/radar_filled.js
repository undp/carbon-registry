/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Radar filled example
 *
 *  Demo JS code for filled radar chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsRadarFilledLight = function() {


    //
    // Setup module components
    //

    // Filled radar chart
    var _radarFilledLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var radar_filled_element = document.getElementById('radar_filled');


        //
        // Charts configuration
        //

        if (radar_filled_element) {

            // Initialize chart
            var radar_filled = echarts.init(radar_filled_element);


            //
            // Chart config
            //

            // Options
            radar_filled.setOption({

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    top: 0,
                    left: 0,
                    data: ['Allocated Budget','Actual Spending'],
                    itemHeight: 8,
                    itemWidth: 8
                },

                // Setup polar coordinates
                radar: [{
                    radius: '84%',
                    center:  ['50%', '50%'],
                    name: {
                        color: '#777'
                    },
                    indicator: [
                        {text: 'Sales', max: 100},
                        {text: 'Administration', max: 100},
                        {text: 'Information Techology', max: 100},
                        {text: 'Customer Support', max: 100},
                        {text: 'Development', max: 100},
                        {text: 'Marketing', max: 100}
                    ],
                }],

                // Add series
                series: [{
                    name: 'Budget vs spending',
                    type: 'radar',
                    symbolSize: 7,
                    itemStyle: {
                        normal: {
                            borderWidth: 1
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    data: [
                        {
                            value: [97, 68, 88, 94, 90, 86],
                            name: 'Allocated Budget'
                        },
                        {
                            value: [97, 32, 46, 95, 88, 92],
                            name: 'Actual Spending'
                        }
                    ]
                }]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            radar_filled_element && radar_filled.resize();
        };

        // On sidebar width change
        var sidebarToggle = document.querySelector('.sidebar-control');
        sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

        // On window resize
        var resizeCharts;
        window.addEventListener('resize', function() {
            clearTimeout(resizeCharts);
            resizeCharts = setTimeout(function () {
                triggerChartResize();
            }, 200);
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _radarFilledLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsRadarFilledLight.init();
});
