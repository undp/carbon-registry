/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Radar basic example
 *
 *  Demo JS code for basic radar chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsRadarBasicDark = function() {


    //
    // Setup module components
    //

    // Basic radar chart
    var _radarBasicDarkExample = function() {
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
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: [10, 15],
                    textStyle: {
                        color: '#222',
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
                    itemWidth: 8,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Setup polar coordinates
                radar: [{
                    radius: '84%',
                    center:  ['50%', '50%'],
                    name: {
                        color: '#fff'
                    },
                    indicator: [
                        {text: 'Sales', max: 6000},
                        {text: 'Administration', max: 16000},
                        {text: 'Information Techology', max: 30000},
                        {text: 'Customer Support', max: 38000},
                        {text: 'Development', max: 52000},
                        {text: 'Marketing', max: 25000}
                    ],
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(255,255,255,0.1)', 'rgba(0,0,0,0.1)']
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    }
                }],

                // Add series
                series: [{
                    name: 'Budget vs spending',
                    type: 'radar',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            borderWidth: 2
                        }
                    },
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: 'Allocated Budget',
                            itemStyle: {
                                color: '#d87a80'
                            }
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: 'Actual Spending',
                            itemStyle: {
                                color: '#2ec7c9'
                            }
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
            _radarBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsRadarBasicDark.init();
});
