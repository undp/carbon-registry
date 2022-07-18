/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Single calendar example
 *
 *  Demo JS code for single calendar chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsCalendarSingleLight = function() {


    //
    // Setup module components
    //

    // Single calendar chart
    var _calendarSingleLightExample = function() {
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
                        fontWeight: 500
                    },
                    subtextStyle: {
                        fontSize: 12
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
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
                    itemWidth: 8
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
                        fontSize: 12
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
                            borderColor: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#333',
                            width: 2
                        }
                    },
                    yearLabel: {show: false}
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
            _calendarSingleLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsCalendarSingleLight.init();
});
