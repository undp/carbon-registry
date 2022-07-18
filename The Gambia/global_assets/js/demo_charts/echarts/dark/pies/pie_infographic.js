/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Infographic pie example
 *
 *  Demo JS code for infographic pie chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsPieInfographicedDark = function() {


    //
    // Setup module components
    //

    // Infographic pie chart
    var _scatterPieInfographicDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var pie_infographic_element = document.getElementById('pie_infographic');


        //
        // Charts configuration
        //

        if (pie_infographic_element) {

            // Initialize chart
            var pie_infographic = echarts.init(pie_infographic_element);


            //
            // Chart config
            //

            // Common styles
            var dataStyle = {
                normal: {
                    borderWidth: 2,
                    borderColor: '#353f53',
                    label: {show: false},
                    labelLine: {show: false}
                }
            };
            var placeHolderStyle = {
                normal: {
                    color: 'transparent',
                    borderWidth: 0
                }
            };

            // Options
            pie_infographic.setOption({

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
                    text: 'Are you happy?',
                    subtext: 'Utrecht, Netherlands',
                    left: 'center',
                    top: '45%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 19,
                        fontWeight: 500
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
                    formatter: function (params) {
                        if(params.color == "transparent")return;
                        return params.percent + '%' + ' - ' + params.seriesName;
                    }
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    top: '5%',
                    left: (pie_infographic_element.offsetWidth / 2) + 20,
                    data: ['60% Definitely yes','30% Could be better','10% Not at the moment'],
                    itemHeight: 8,
                    itemWidth: 8,
                    itemGap: 15,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Add series
                series: [
                    {
                        name: 'Definitely yes',
                        type: 'pie',
                        cursor: 'default',
                        clockWise: false,
                        radius: ['75%', '90%'],
                        hoverOffset: 0,
                        itemStyle: dataStyle,
                        data: [
                            {
                                value: 60,
                                name: '60% Definitely yes'
                            },
                            {
                                value: 40,
                                name: '',
                                itemStyle: placeHolderStyle
                            }
                        ]
                    },

                    {
                        name: 'Could be better',
                        type:'pie',
                        cursor: 'default',
                        clockWise: false,
                        radius: ['60%', '75%'],
                        hoverOffset: 0,
                        itemStyle: dataStyle,
                        data: [
                            {
                                value: 30, 
                                name: '30% Could be better'
                            },
                            {
                                value: 70,
                                name: 'invisible',
                                silent: false,
                                itemStyle: placeHolderStyle
                            }
                        ]
                    },

                    {
                        name: 'Not at the moment',
                        type: 'pie',
                        cursor: 'default',
                        clockWise: false,
                        radius: ['45%', '60%'],
                        hoverOffset: 0,
                        itemStyle: dataStyle,
                        data: [
                            {
                                value: 10, 
                                name: '10% Not at the moment'
                            },
                            {
                                value: 90,
                                name: 'invisible',
                                itemStyle: placeHolderStyle
                            }
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
            pie_infographic_element && pie_infographic.resize();
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
            _scatterPieInfographicDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsPieInfographicedDark.init();
});
