/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Basic gauge example
 *
 *  Demo JS code for baic gauge chart [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsGaugeBasicLight = function() {


    //
    // Setup module components
    //

    // Basic gauge chart
    var _gaugeBasicLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var gauge_basic_element = document.getElementById('gauge_basic');


        //
        // Charts configuration
        //

        if (gauge_basic_element) {

            // Initialize chart
            var gauge_basic = echarts.init(gauge_basic_element);


            //
            // Chart config
            //

            // Options
            var gauge_basic_options = {

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Add title
                title: {
                    text: 'Server resources usage',
                    subtext: 'Random demo data',
                    left: 'center',
                    textStyle: {
                        fontSize: 17,
                        fontWeight: 500,
                        color: '#008acd'
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
                    },
                    formatter: '{a} <br/>{b}: {c}%'
                },

                // Add series
                series: [
                    {
                        name: 'Memory usage',
                        type: 'gauge',
                        center: ['50%', '62%'],
                        radius: '90%',
                        detail: {formatter:'{value}%'},
                        axisLine: {
                            lineStyle: {
                                color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']], 
                                width: 15
                            }
                        },
                        axisTick: {
                            splitNumber: 10,
                            length: 20,
                            lineStyle: {
                                color: 'auto'
                            }
                        },
                        splitLine: {
                            length: 22,
                            lineStyle: {
                                color: 'auto'
                            }
                        },
                        title: {
                            offsetCenter: [0, '60%'],
                            textStyle: {
                                fontSize: 13
                            }
                        },
                        detail: {
                            offsetCenter: [0, '45%'],
                            formatter: '{value}%',
                            textStyle: {
                                fontSize: 27,
                                fontWeight: 500
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        data: [{value: 50, name: 'Memory usage'}]
                    }
                ]
            };

            gauge_basic.setOption(gauge_basic_options);

            // Add random data
            clearInterval(timeTicket);
            var timeTicket = setInterval(function () {
                gauge_basic_options.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
                gauge_basic.setOption(gauge_basic_options, true);
            }, 2000);
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            gauge_basic_element && gauge_basic.resize();
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
            _gaugeBasicLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsGaugeBasicLight.init();
});
