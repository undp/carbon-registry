/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic area chart example
 *
 *  Demo JS code for basic area chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsAreaBasicLight = function() {


    //
    // Setup module components
    //

    // Basic area chart
    var _areaBasicLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var area_basic_element = document.getElementById('area_basic');


        //
        // Charts configuration
        //

        if (area_basic_element) {

            // Initialize chart
            var area_basic = echarts.init(area_basic_element);


            //
            // Chart config
            //

            // Options
            area_basic.setOption({

                // Define colors
                color: ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['New orders', 'In progress', 'Closed deals'],
                    itemHeight: 8,
                    itemGap: 20
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Closed deals',
                        type: 'line',
                        data: [10, 12, 21, 54, 260, 830, 710],
                        areaStyle: {
                            normal: {
                                opacity: 0.25
                            }
                        },
                        smooth: true,
                        symbolSize: 7,
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        }
                    },
                    {
                        name: 'In progress',
                        type: 'line',
                        smooth: true,
                        symbolSize: 7,
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.25
                            }
                        },
                        data: [30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name: 'New orders',
                        type: 'line',
                        smooth: true,
                        symbolSize: 7,
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.25
                            }
                        },
                        data: [1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            area_basic_element && area_basic.resize();
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
            _areaBasicLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsAreaBasicLight.init();
});
