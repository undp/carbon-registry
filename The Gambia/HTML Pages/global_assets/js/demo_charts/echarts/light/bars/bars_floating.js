/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Floating bars example
 *
 *  Demo JS code for floating bars chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsBarsFloatingLight = function() {


    //
    // Setup module components
    //

    // Floating bar chart
    var _barsFloatingLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var bars_float_element = document.getElementById('bars_float');


        //
        // Charts configuration
        //

        if (bars_float_element) {

            // Initialize chart
            var bars_float = echarts.init(bars_float_element);


            //
            // Chart config
            //

            // Variables
            var placeHoledStyle = {
                normal: {
                    barBorderColor: 'transparent',
                    color: 'transparent'
                }
            };
            var dataStyle = { 
                normal: {
                    barBorderRadius: 3,
                    label: {
                        show: true,
                        position: 'insideLeft',
                        formatter: '{c}%',
                        textStyle: {
                            padding: 5
                        }
                    }
                }
            };

            // Options
            bars_float.setOption({

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 5,
                    right: 10,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['GML', 'PYP','WTC', 'ZTW'],
                    itemHeight: 8,
                    itemGap: 20,
                    textStyle: {
                        padding: [0, 5]
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
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    },
                    formatter: '<div class="mb-1">{b}</div>{a0}: {c0}%<br/>{a2}: {c2}%<br/>{a4}: {c4}%<br/>{a6}: {c6}%'
                },

                // Horizontal axis
                xAxis: [{
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
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'category',
                    data: ['Paris', 'Berlin', 'Amsterdam', 'Madrid', 'Munich', 'Budapest'],
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
                            color: '#eee'
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
                        name: 'GML',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: dataStyle,
                        data: [38, 50, 33, 72, 67, 34]
                    },
                    {
                        name: 'GML',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: placeHoledStyle,
                        data: [62, 50, 67, 28, 33, 66]
                    },
                    {
                        name: 'PYP',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: dataStyle,
                        data: [61, 41, 42, 30, 50, 62]
                    },
                    {
                        name: 'PYP',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: placeHoledStyle,
                        data: [39, 59, 58, 70, 50, 38]
                    },
                    {
                        name: 'WTC',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: dataStyle,
                        data: [37, 35, 44, 60, 28, 43]
                    },
                    {
                        name: 'WTC',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: placeHoledStyle,
                        data: [63, 65, 56, 40, 72, 57]
                    },
                    {
                        name: 'ZTW',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: dataStyle,
                        data: [71, 50, 31, 39, 40, 29]
                    },
                    {
                        name: 'ZTW',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: placeHoledStyle,
                        data: [29, 50, 69, 61, 60, 61]
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            bars_float_element && bars_float.resize();
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
            _barsFloatingLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsBarsFloatingLight.init();
});
