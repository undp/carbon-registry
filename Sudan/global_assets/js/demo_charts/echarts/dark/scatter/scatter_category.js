/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter category example
 *
 *  Demo JS code for scatter category chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterCategoryDark = function() {


    //
    // Setup module components
    //

    // Category scatter chart
    var _scatterCategoryDarkExample = function() {
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
                    data: ['Series1', 'Series2'],
                    itemGap: 20,
                    textStyle: {
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
                    },
                    axisPointer: {
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },

                // Axis pointer
                axisPointer: [{
                    label: {
                        backgroundColor: '#b6a2de',
                        shadowBlur: 0
                    }
                }],

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
                        borderColor: 'rgba(255,255,255,0.1)',
                        fillerColor: 'rgba(0,0,0,0.1)',
                        handleStyle: {
                            color: '#585f63'
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        handleStyle: {
                            color: '#8893a9'
                        },
                        dataBackground: {
                            areaStyle: {
                                color: 'rgba(0,0,0,0.5)'
                            }
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
                    splitNumber: 5,
                    textStyle: {
                        color: '#fff'
                    }
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
            _scatterCategoryDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterCategoryDark.init();
});
