/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Pie with levels example
 *
 *  Demo JS code for pie chart with levels [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsPieLevelsDark = function() {


    //
    // Setup module components
    //

    // Pie chart with levels
    var _pieLevelsDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var pie_levels_element = document.getElementById('pie_levels');


        //
        // Charts configuration
        //

        if (pie_levels_element) {

            // Initialize chart
            var pie_levels = echarts.init(pie_levels_element);


            //
            // Chart config
            //

            // Options
            pie_levels.setOption({

                // Colors
                color: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Add title
                title: {
                    text: 'Browser statistics',
                    subtext: 'Based on shared research',
                    left: 'center',
                    textStyle: {
                        fontSize: 17,
                        fontWeight: 500,
                        color: '#fff'
                    },
                    subtextStyle: {
                        fontSize: 12,
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
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    left: 0,
                    data: ['Chrome','Firefox','Safari','IE9+','IE8-'],
                    itemHeight: 8,
                    itemWidth: 8,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Add series
                series: (function () {
                    var series = [];
                    for (var i = 0; i < 30; i++) {
                        series.push({
                            name: 'Browser',
                            type: 'pie',
                            hoverOffset: 0,
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    borderColor: '#353f53',
                                    label: {
                                        show: i > 28
                                    },
                                    labelLine: {
                                        show: i > 28,
                                        length: 20
                                    }
                                }
                            },
                            radius: [i * 3.6 + 40, i * 3.6 + 43],
                            center: ['50%', '55%'],
                            data: [
                                {value: i * 128 + 80,  name: 'Chrome'},
                                {value: i * 64  + 160,  name: 'Firefox'},
                                {value: i * 32  + 320,  name: 'Safari'},
                                {value: i * 16  + 640,  name: 'IE9+'},
                                {value: i * 8  + 1280, name: 'IE8-'}
                            ]
                        })
                    }
                    return series;
                })()
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            pie_levels_element && pie_levels.resize();
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
            _pieLevelsDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsPieLevelsDark.init();
});
