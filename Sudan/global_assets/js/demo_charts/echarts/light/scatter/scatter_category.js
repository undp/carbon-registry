/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter category example
 *
 *  Demo JS code for scatter category chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterCategoryLight = function() {


    //
    // Setup module components
    //

    // Category scatter chart
    var _scatterCategoryLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_category_element = document.getElementById('scatter_category');


        //
        // Charts configuration
        //

        if (scatter_category_element) {

            // Initialize chart
            var scatter_category = echarts.init(scatter_category_element);


            //
            // Chart config
            //

            // Options
            scatter_category.setOption({

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
                    top: 74,
                    bottom: 60,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Series1', 'Series2']
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

                // Add data zoom
                dataZoom: [
                    {
                        type: 'inside',
                        start: 30,
                        end: 70
                    },
                    {
                        show: true,
                        type: 'slider',
                        start: 30,
                        end: 70,
                        height: 40,
                        bottom: 0,
                        borderColor: '#ccc',
                        fillerColor: 'rgba(0,0,0,0.05)',
                        handleStyle: {
                            color: '#585f63'
                        }
                    }
                ],

                // Display visual map
                visualMap: {
                    type: 'piecewise',
                    min: 0,
                    max: 100,
                    orient: 'horizontal',
                    top: 35,
                    left: 'center',
                    splitNumber: 5
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: function () {
                        var list = [];
                        var len = 0;
                        while (len++ < 500) {
                            list.push(len);
                        }
                        return list;
                    }(),
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
                        name: 'Series1',
                        type: 'scatter',
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                return params.seriesName + ' （'  + 'Category' + params.value[0] + '）<br/>'
                                + params.value[1] + ', ' 
                                + params.value[2]; 
                            },
                            axisPointer: {
                                show: true
                            }
                        },
                        symbolSize: function (value) {
                            return Math.round(value[2]/5);
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var value;
                            while (len++ < 500) {
                                d.push([
                                    len,
                                    (Math.random()*30).toFixed(2) - 0,
                                    (Math.random()*100).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
                    },

                    {
                        name: 'Series2',
                        type: 'scatter',
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                return params.seriesName + ' （'  + 'Category' + params.value[0] + '）<br/>'
                                + params.value[1] + ', ' 
                                + params.value[2]; 
                            },
                            axisPointer:{
                                show: true
                            }
                        },
                        symbolSize: function (value) {
                            return Math.round(value[2]/5);
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var value;
                            while (len++ < 500) {
                                d.push([
                                    len,
                                    (Math.random()*30).toFixed(2) - 0,
                                    (Math.random()*100).toFixed(2) - 0
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
            scatter_category_element && scatter_category.resize();
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
            _scatterCategoryLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterCategoryLight.init();
});
