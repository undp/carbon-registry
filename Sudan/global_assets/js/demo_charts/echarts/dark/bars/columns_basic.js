/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic column example
 *
 *  Demo JS code for basic column chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsColumnsBasicDark = function() {


    //
    // Setup module components
    //

    // Basic column chart
    var _columnsBasicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var columns_basic_element = document.getElementById('columns_basic');


        //
        // Charts configuration
        //

        if (columns_basic_element) {

            // Initialize chart
            var columns_basic = echarts.init(columns_basic_element);


            //
            // Chart config
            //

            // Options
            columns_basic.setOption({

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
                    data: ['Evaporation', 'Precipitation'],
                    itemHeight: 8,
                    itemGap: 20,
                    textStyle: {
                        padding: [0, 5],
                        color: '#fff'
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: [10, 15],
                    textStyle: {
                        color: '#222',
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisLabel: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Axis pointer
                axisPointer: [{
                    lineStyle: {
                        color: 'rgba(255,255,255,0.25)'
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{type: 'average', name: 'Average'}]
                        }
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 58.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{type: 'average', name: 'Average'}]
                        }
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            columns_basic_element && columns_basic.resize();
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
            _columnsBasicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsColumnsBasicDark.init();
});
