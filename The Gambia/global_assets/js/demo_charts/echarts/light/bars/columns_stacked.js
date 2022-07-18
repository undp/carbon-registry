/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Stacked column example
 *
 *  Demo JS code for stacked column chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsColumnsStackedLight = function() {


    //
    // Setup module components
    //

    // Stacked column chart
    var _columnsStackedLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var columns_stacked_element = document.getElementById('columns_stacked');


        //
        // Charts configuration
        //
        
        if (columns_stacked_element) {

            // Initialize chart
            var columns_stacked = echarts.init(columns_stacked_element);


            //
            // Chart config
            //

            // Options
            columns_stacked.setOption({

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
                    data: ['Direct', 'Email', 'Prints', 'Videos', 'Television', 'Yahoo', 'Google', 'Bing', 'Other'],
                    itemHeight: 8,
                    itemGap: 20
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
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Email',
                        type: 'bar',
                        stack: 'Advertising',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Prints',
                        type: 'bar',
                        stack: 'Advertising',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Videos',
                        type: 'bar',
                        stack: 'Advertising',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Television',
                        type: 'bar',
                        stack: 'Advertising',
                        data: [862, 1018, 964, 1026, 1679, 1600, 1570]
                    },
                    {
                        name: 'Yahoo',
                        type: 'bar',
                        barWidth: 10,
                        stack: 'Television',
                        data: [620, 732, 701, 734, 1090, 1130, 1120]
                    },
                    {
                        name: 'Google',
                        type: 'bar',
                        stack: 'Television',
                        data: [120, 132, 101, 134, 290, 230, 220]
                    },
                    {
                        name: 'Bing',
                        type: 'bar',
                        stack: 'Television',
                        data: [60, 72, 71, 74, 190, 130, 110]
                    },
                    {
                        name: 'Other',
                        type: 'bar',
                        stack: 'Television',
                        data: [62, 82, 91, 84, 109, 110, 120]
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            columns_stacked_element && columns_stacked.resize();
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
            _columnsStackedLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsColumnsStackedLight.init();
});
