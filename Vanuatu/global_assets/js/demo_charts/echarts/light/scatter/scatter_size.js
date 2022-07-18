/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter bubble size example
 *
 *  Demo JS code for scatter chart with custom bubble size [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterBubbleSizeLight = function() {


    //
    // Setup module components
    //

    // Scatter chart with custom bubble size
    var _scatterBubbleSizeLightExample = function() {
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
                    data: ['Scatter1', 'Scatter2']
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
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
                    splitNumber: 4,
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
                    scale: true,
                    splitNumber: 4,
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
            _scatterBubbleSizeLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterBubbleSizeLight.init();
});
