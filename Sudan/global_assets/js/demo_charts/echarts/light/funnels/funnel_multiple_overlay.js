/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Multiple funnels with overlay example
 *
 *  Demo JS code for multiple funnel charts with overlay [light theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsFunnelMultipleOverlayLight = function() {


    //
    // Setup module components
    //

    // Multiple funnel charts with overlay
    var _funnelMultipleOverlayLightExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var funnel_multiple_overlay_element = document.getElementById('funnel_multiple_overlay');


        //
        // Charts configuration
        //

        if (funnel_multiple_overlay_element) {

            // Initialize chart
            var funnel_multiple_overlay = echarts.init(funnel_multiple_overlay_element);


            //
            // Chart config
            //

            // Options
            funnel_multiple_overlay.setOption({

                // Colors
                color: [
                    'rgba(255, 69, 0, 0.5)',
                    'rgba(255, 150, 0, 0.5)',
                    'rgba(255, 200, 0, 0.5)',
                    'rgba(155, 200, 50, 0.5)',
                    'rgba(55, 200, 100, 0.5)'
                ],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Add title
                title: {
                    text: 'Browser popularity',
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
                    },
                    formatter: '{a} <br/>{b}: {c}%'
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    left: 0,
                    data: ['Chrome','Opera','Safari','Firefox','IE'],
                    itemHeight: 8,
                    itemWidth: 8
                },

                // Add series
                series: [
                    {
                        name: 'Expected',
                        type: 'funnel',
                        left: '25%',
                        right: '25%',
                        top: '16%',
                        height: '84%',
                        width: '50%',
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                label: {
                                    formatter: '{b}'
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}: {c}%'
                                }
                            }
                        },
                        data: [
                            {value: 45, name: 'IE'},
                            {value: 60, name: 'Firefox'},
                            {value: 70, name: 'Safari'},
                            {value: 80, name: 'Opera'},
                            {value: 100, name: 'Chrome'}
                        ]
                    },
                    {
                        name: 'Result',
                        type: 'funnel',
                        left: '25%',
                        right: '25%',
                        top: '16%',
                        height: '84%',
                        width: '50%',
                        maxSize: '80%',
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                label: {
                                    position: 'inside',
                                    formatter: '{c}%',
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}: {c}%'
                                }
                            }
                        },
                        data: [
                            {value: 30, name: 'IE'},
                            {value: 48, name: 'Firefox'},
                            {value: 66, name: 'Safari'},
                            {value: 69, name: 'Opera'},
                            {value: 80, name: 'Chrome'}
                        ]
                    }
                ]
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function() {
            funnel_multiple_overlay_element && funnel_multiple_overlay.resize();
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
            _funnelMultipleOverlayLightExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsFunnelMultipleOverlayLight.init();
});
