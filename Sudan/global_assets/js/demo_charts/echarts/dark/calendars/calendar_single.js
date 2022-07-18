/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Single calendar example
 *
 *  Demo JS code for single calendar chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsCalendarSingleDark = function() {


    //
    // Setup module components
    //

    // Single calendar chart
    var _calendarSingleDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var calendar_single_element = document.getElementById('calendar_single');


        //
        // Charts configuration
        //

        if (calendar_single_element) {

            // Initialize chart
            var calendar_single = echarts.init(calendar_single_element);


            //
            // Chart config
            //

            // Demo data
            function getVirtulData(year) {
                year = year || '2017';
                var date = +echarts.number.parseDate(year + '-01-01');
                var end = +echarts.number.parseDate((+year + 1) + '-01-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date; time < end; time += dayTime) {
                    data.push([
                        echarts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            }

            // Options
            calendar_single.setOption({

                // Add title
                title: {
                    text: 'Github commits',
                    subtext: 'Open source information',
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
                    }
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    left: 0,
                    data: ['IE', 'Opera', 'Safari', 'Firefox', 'Chrome'],
                    itemHeight: 8,
                    itemWidth: 8,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Visual map
                visualMap: {
                    min: 0,
                    max: 10000,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    bottom: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Calendar
                calendar: {
                    top: 80,
                    left: 30,
                    right: 5,
                    cellSize: ['auto', 25],
                    range: '2016',
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#353f53'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#353f53',
                            width: 3
                        }
                    },
                    yearLabel: {
                        show: false
                    },
                    dayLabel: {
                        color: '#fff'
                    },
                    monthLabel: {
                        color: '#fff'
                    }
                },

                // Add series
                series: [{
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: getVirtulData(2016)
                }]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            calendar_single_element && calendar_single.resize();
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
            _calendarSingleDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsCalendarSingleDark.init();
});
