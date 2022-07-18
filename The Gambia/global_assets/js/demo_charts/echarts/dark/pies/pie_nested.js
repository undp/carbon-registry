/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Nested pie example
 *
 *  Demo JS code for nexted pie chart [dark theme]
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsPieNestedDark = function() {


    //
    // Setup module components
    //

    // Nested pie chart
    var _scatterPieNestedDarkExample = function() {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define element
        var pie_nested_element = document.getElementById('pie_nested');


        //
        // Charts configuration
        //

        if (pie_nested_element) {

            // Initialize chart
            var pie_nested = echarts.init(pie_nested_element);


            //
            // Chart config
            //

            // Options
            pie_nested.setOption({

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
                    data: ['Italy','Spain','Austria','Germany','Poland','Denmark','Hungary','Portugal','France','Netherlands'],
                    itemHeight: 8,
                    itemWidth: 8,
                    textStyle: {
                        color: '#fff'
                    }
                },

                // Add series
                series: [

                    // Inner
                    {
                        name: 'Countries',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#353f53',
                                label: {
                                    position: 'inner'
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [
                            {value: 535, name: 'Italy'},
                            {value: 679, name: 'Spain'},
                            {value: 1548, name: 'Austria'}
                        ]
                    },

                    // Outer
                    {
                        name: 'Countries',
                        type: 'pie',
                        radius: ['60%', '85%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#353f53'
                            }
                        },
                        data: [
                            {value: 535, name: 'Italy'},
                            {value: 310, name: 'Germany'},
                            {value: 234, name: 'Poland'},
                            {value: 135, name: 'Denmark'},
                            {value: 948, name: 'Hungary'},
                            {value: 251, name: 'Portugal'},
                            {value: 147, name: 'France'},
                            {value: 202, name: 'Netherlands'}
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
            pie_nested_element && pie_nested.resize();
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
            _scatterPieNestedDarkExample();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    EchartsPieNestedDark.init();
});
