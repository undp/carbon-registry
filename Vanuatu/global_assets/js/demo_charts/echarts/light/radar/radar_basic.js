/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Radar basic example
 *
 *  Demo JS code for basic radar chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsRadarBasicLight = function() {


    //
    // Setup module components
    //

    // Basic radar chart
    var _radarBasicLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var radar_basic_element = document.getElementById('radar_basic');


        //
        // Charts configuration
        //

        if (radar_basic_element) {

            // Initialize chart
            var radar_basic = echarts.init(radar_basic_element);


            //
            // Chart config
            //

            // Options
            radar_basic.setOption({

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
                        {text: 'Sales', max: 6000},
                        {text: 'Administration', max: 16000},
                        {text: 'Information Techology', max: 30000},
                        {text: 'Customer Support', max: 38000},
                        {text: 'Development', max: 52000},
                        {text: 'Marketing', max: 25000}
                    ]
                }],

                // Add series
                series: [{
                    name: 'Budget vs spending',
                    type: 'radar',
                    symbolSize: 7,
                    itemStyle: {
                        normal: {
                            borderWidth: 2
                        }
                    },
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: 'Allocated Budget'
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
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
            radar_basic_element && radar_basic.resize();
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
            _radarBasicLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsRadarBasicLight.init();
});
