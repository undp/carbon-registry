/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Custom gauge example
 *
 *  Demo JS code for custom gauge chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsGaugeCustomDark = function() {


    //
    // Setup module components
    //

    // Custom gauge chart
    var _gaugeCustomDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var gauge_custom_element = document.getElementById('gauge_custom');


        //
        // Charts configuration
        //

        if (gauge_custom_element) {

            // Initialize chart
            var gauge_custom = echarts.init(gauge_custom_element);


            //
            // Chart config
            //

            // Options
            var gauge_custom_options = {

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
                    formatter: '{a} <br/>{b} : {c}%'
                },

                // Add series
                series: [
                    {
                        name: 'Memory usage',
                        type: 'gauge',
                        center: ['50%', '57.5%'],
                        radius: '80%',
                        startAngle: 150,
                        endAngle: -150,
                        axisLine: {
                            lineStyle: {
                                color: [[0.2, 'lightgreen'], [0.4, 'orange'], [0.8, 'skyblue'], [1, '#ff4500']], 
                                width: 30
                            }
                        },
                        axisTick: {
                            splitNumber: 5,
                            length: 5,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            formatter: function(v) {
                                switch (v+''){
                                    case '10': return 'Idle';
                                    case '30': return 'Low';
                                    case '60': return 'Normal';
                                    case '90': return 'High';
                                    default: return '';
                                }
                            }
                        },
                        splitLine: {
                            length: 35,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            offsetCenter: ['-81%', -20],
                            textStyle: {
                                fontSize: 13,
                                color: '#fff'
                            }
                        },
                        detail: {
                            offsetCenter: ['-80%', 10],
                            formatter: '{value}%',
                            textStyle: {
                                fontSize: 25,
                                fontWeight: 500
                            }
                        },
                        data: [{
                            value: 50,
                            name: 'Memory usage'
                        }]
                    }
                ]
            };

            gauge_custom.setOption(gauge_custom_options);

            // Add random data
            clearInterval(timeTicket2);
            var timeTicket2 = setInterval(function () {
                gauge_custom_options.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
                gauge_custom.setOption(gauge_custom_options, true);
            }, 2000);
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            gauge_custom_element && gauge_custom.resize();
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
            _gaugeCustomDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsGaugeCustomDark.init();
});
