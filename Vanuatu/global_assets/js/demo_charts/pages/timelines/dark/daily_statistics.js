/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Daily statistics chart example
 *
 *  Demo JS code for daily statistics chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsDailyStatistics = function() {


    //
    // Setup module components
    //

    // Basic bar chart
    var _dailyStatisticsExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var daily_statistics_element = document.getElementById('daily_statistics');


        //
        // Charts configuration
        //

        if (daily_statistics_element) {

            // Initialize chart
            var daily_statistics = echarts.init(daily_statistics_element);


            //
            // Chart config
            //

            // Options
            daily_statistics.setOption({

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
                    right: 10,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Clicks','Visits','Sales'],
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
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],
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
                    },
                    axisTick: {
                        show: false
                    },
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    name: 'Visits',
                    nameTextStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    },
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
                },
                {
                    type: 'value',
                    name: 'Clicks',
                    nameTextStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    },
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

                // Add series
                series: [
                    {
                        name: 'Clicks',
                        type: 'bar',
                        data: [20, 150, 270, 340, 400, 700, 1000, 750, 500, 380, 220, 120]
                    },
                    {
                        name: 'Visits',
                        type: 'bar',
                        data: [130, 160, 330, 380, 480, 1100, 1250, 900, 680, 490, 350, 230]
                    },
                    {
                        name: 'Sales',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 7,
                        yAxisIndex: 1,
                        data: [10, 50, 70, 100, 110, 130, 150, 180, 160, 140, 120, 60],
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
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
            daily_statistics_element && daily_statistics.resize();
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
            _dailyStatisticsExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsDailyStatistics.init();
});
