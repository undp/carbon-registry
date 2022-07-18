/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter roaming example
 *
 *  Demo JS code for scatter roaming chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterRoamingLight = function() {


    //
    // Setup module components
    //

    // Scatter roaming chart
    var _scatterRoamingLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_roaming_element = document.getElementById('scatter_roaming');


        //
        // Charts configuration
        //

        if (scatter_roaming_element) {

            // Initialize chart
            var scatter_roaming = echarts.init(scatter_roaming_element);


            //
            // Chart config
            //

            // Options
            scatter_roaming.setOption({

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
                    top: 10,
                    bottom: 50,
                    containLabel: true
                },

                // Display visual map
                visualMap: {
                    type: 'continuous',
                    min: 0,
                    max: 100,
                    bottom: 0,
                    left: 'center',
                    text: ['High', 'Low'],
                    textGap: 20,
                    color: ['#FB8C00', '#FFE0B2'],
                    calculable: true,
                    itemWidth: 15,
                    itemHeight: 200,
                    orient: 'horizontal',
                    textStyle: {
                        fontSize: 12,
                        color: '#777'
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
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
                        name: 'Scatter1',
                        type: 'scatter',
                        data: (function () {
                            var d = [];
                            var len = 500;
                            var value;
                            while (len--) {
                                value = (Math.random()*100).toFixed(2) - 0;
                                d.push([
                                    (Math.random()*value + value).toFixed(2) - 0,
                                    (Math.random()*value).toFixed(2) - 0,
                                    value
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
            scatter_roaming_element && scatter_roaming.resize();
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
            _scatterRoamingLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterRoamingLight.init();
});
