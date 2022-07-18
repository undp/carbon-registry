/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Scatter punch example
 *
 *  Demo JS code for scatter punch chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsScatterPunchDark = function() {


    //
    // Setup module components
    //

    // Scatter punch chart
    var _scatterPunchDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var scatter_punch_element = document.getElementById('scatter_punch');


        //
        // Charts configuration
        //

        if (scatter_punch_element) {

            // Initialize chart
            var scatter_punch = echarts.init(scatter_punch_element);


            //
            // Chart config
            //

            // Demo data
            var hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am','10am','11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
            var days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
            var data = [
                [0,0,15],[0,1,11],[0,2,6],[0,3,16],[0,4,14],[0,5,10],[0,6,4],[0,7,12],[0,8,4],[0,9,20],[0,10,17],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],
                [1,0,7],[1,1,10],[1,2,9],[1,3,17],[1,4,8],[1,5,4],[1,6,7],[1,7,2],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],
                [2,0,1],[2,1,1],[2,2,8],[2,3,10],[2,4,6],[2,5,4],[2,6,12],[2,7,20],[2,8,16],[2,9,10],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],
                [3,0,7],[3,1,3],[3,2,10],[3,3,0],[3,4,4],[3,5,0],[3,6,0],[3,7,4],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],
                [4,0,1],[4,1,3],[4,2,2],[4,3,6],[4,4,3],[4,5,1],[4,6,7],[4,7,16],[4,8,10],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],
                [5,0,2],[5,1,1],[5,2,9],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],
                [6,0,1],[6,1,0],[6,2,4],[6,3,0],[6,4,0],[6,5,6],[6,6,0],[6,7,15],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,10],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]
            ];
            data = data.map(function (item) {
                return [item[1], item[0], item[2]];
            });

            // Options
            scatter_punch.setOption({

                // Main colors
                color: ['#b6a2de'],

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
                    top: 0,
                    bottom: 0,
                    containLabel: true
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
                    },
                    formatter: function (params) {
                        return '<div class="mb-1">' + days[params.value[1]] + '</div>' + '<div class="mr-3">Commits: ' + params.value[2] + '</div>' + '<div class="mr-3">Time: ' + hours[params.value[0]] + '</div>';
                    }
                },

                // Axis pointer
                axisPointer: [{
                    label: {
                        backgroundColor: '#b6a2de',
                        shadowBlur: 0
                    }
                }],

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: hours,
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
                    type: 'category',
                    data: days,
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
                series: [{
                    name: 'Punch Card',
                    type: 'scatter',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data: data
                }]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            scatter_punch_element && scatter_punch.resize();
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
            _scatterPunchDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsScatterPunchDark.init();
});
