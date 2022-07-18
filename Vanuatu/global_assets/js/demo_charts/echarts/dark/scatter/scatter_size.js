/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter bubble size example
 *
 *  Demo JS code for scatter chart with custom bubble size [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterBubbleSizeDark = function() {


    //
    // Setup module components
    //

    // Scatter chart with custom bubble size
    var _scatterBubbleSizeDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_bubble_size_element = document.getElementById('scatter_bubble_size');


        //
        // Charts configuration
        //

        if (scatter_bubble_size_element) {

            // Initialize chart
            var scatter_bubble_size = echarts.init(scatter_bubble_size_element);


            //
            // Chart config
            //

            // Demo data
            function random(){
                var r = Math.round(Math.random() * 100);
                return (r * (r % 2 == 0 ? 1: -1));
            }
            function randomDataArray() {
                var d = [];
                var len = 100;
                while (len--) {
                    d.push([
                        random(),
                        random(),
                        Math.abs(random()),
                    ]);
                }
                return d;
            }

            // Options
            scatter_bubble_size.setOption({

                // Main colors
                color: ['#d87a80', '#5ab1ef'],

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
                    right: 10,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Scatter1', 'Scatter2'],
                    itemGap: 20,
                    textStyle: {
                        color: '#fff'
                    }
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
                    splitNumber: 4,
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
                    scale: true,
                    splitNumber: 4,
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
                    label: {
                        backgroundColor: '#b6a2de',
                        shadowBlur: 0
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Scatter1',
                        type: 'scatter',
                        symbolSize: function (value) {
                            return Math.round(value[2] / 3);
                        },
                        data: randomDataArray()
                    },
                    {
                        name: 'Scatter2',
                        type: 'scatter',
                        symbolSize: function (value) {
                            return Math.round(value[2] / 3);
                        },
                        data: randomDataArray()
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            scatter_bubble_size_element && scatter_bubble_size.resize();
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
            _scatterBubbleSizeDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterBubbleSizeDark.init();
});
