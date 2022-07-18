/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter scale example
 *
 *  Demo JS code for scalable scatter chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterScaleLight = function() {


    //
    // Setup module components
    //

    // Scalable scatter chart
    var _scatterScaleSizeLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_scale_element = document.getElementById('scatter_scale');


        //
        // Charts configuration
        //

        if (scatter_scale_element) {

            // Initialize chart
            var scatter_scale = echarts.init(scatter_scale_element);


            //
            // Chart config
            //

            // Options
            scatter_scale.setOption({

                // Main colors
                color: ['#2ec7c9', '#b6a2de'],

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
                    right: 20,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['sin', 'cos']
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    showDelay : 0,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    axisPointer: {
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        color: '#333',
                        formatter: '{value} cm'
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
                    scale: true,
                    axisLabel: {
                        color: '#333',
                        formatter: '{value} kg'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#eee']
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.015)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'sin',
                        type: 'scatter',
                        large: true,
                        symbolSize: 3,
                        data: (function () {
                            var d = [];
                            var len = 10000;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    (Math.sin(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
                                ]);
                            }
                            return d;
                        })()
                    },
                    {
                        name: 'cos',
                        type: 'scatter',
                        large: true,
                        symbolSize: 2,
                        data: (function () {
                            var d = [];
                            var len = 20000;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    (Math.cos(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
                                ]);
                            }
                            return d;
                        })()
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            scatter_scale_element && scatter_scale.resize();
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
            _scatterScaleSizeLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterScaleLight.init();
});
