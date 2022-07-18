/* ------------------------------------------------------------------------------
 *
 *  # C3.js - chart axis
 *
 *  Demo JS code for c3_axis.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var С3Axis = function() {


    //
    // Setup module components
    //

    // Chart
    var _axisExamples = function() {
        if (typeof c3 == 'undefined') {
            console.warn('Warning - c3.min.js is not loaded.');
            return;
        }

        // Define charts elements
        var axis_categorized_element = document.getElementById('c3-axis-categorized');
        var axis_additional_element = document.getElementById('c3-axis-additional');
        var axis_tick_culling_element = document.getElementById('c3-axis-tick-culling');
        var axis_tick_rotation_element = document.getElementById('c3-axis-tick-rotation');
        var axis_labels_element = document.getElementById('c3-axis-labels');
        var sidebarToggle = document.querySelector('.sidebar-control');


        // Categorized axis
        if(axis_categorized_element) {

            // Generate chart
            var axis_categorized = c3.generate({
                bindto: axis_categorized_element,
                size: { height: 400 },
                data: {
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250]
                    ],
                    type: 'spline'
                },
                color: {
                    pattern: ['#66bb6a']
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']
                    }
                },
                grid: {
                    y: {
                        show: true
                    }
                }
            });

            // Resize chart on sidebar width change
            sidebarToggle && sidebarToggle.addEventListener('click', function() {
                axis_categorized.resize();
            });
        }

        // Additional axis
        if(axis_additional_element) {

            // Generate chart
            var axis_additional = c3.generate({
                bindto: axis_additional_element,
                size: { height: 400 },
                data: {
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 50, 20, 10, 40, 15, 25]
                    ],
                    axes: {
                        data1: 'y',
                        data2: 'y2'
                    },
                    type: 'spline'
                },
                color: {
                    pattern: ['#5ab1ef', '#d87a80']
                },
                axis: {
                    y2: {
                        show: true
                    }
                },
                grid: {
                    y: {
                        show: true
                    }
                }
            });

            // Resize chart on sidebar width change
            sidebarToggle && sidebarToggle.addEventListener('click', function() {
                axis_additional.resize();
            });
        }

        // Axis tick culling
        if(axis_tick_culling_element) {

            // Generate chart
            var axis_tick_culling = c3.generate({
                bindto: axis_tick_culling_element,
                size: { height: 400 },
                data: {
                    columns: [
                        ['sample', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250]
                    ],
                    type: 'spline'
                },
                color: {
                    pattern: ['#ffb980']
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            culling: {
                                max: 4
                            }
                        }
                    }
                },
                grid: {
                    y: {
                        show: true
                    }
                }
            });

            // Resize chart on sidebar width change
            sidebarToggle && sidebarToggle.addEventListener('click', function() {
                axis_tick_culling.resize();
            });
        }

        // Text label rotation
        if(axis_tick_rotation_element) {

            // Generate chart
            var axis_tick_rotation = c3.generate({
                bindto: axis_tick_rotation_element,
                size: { height: 400 },
                data: {
                    x : 'x',
                    columns: [
                        ['x', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        ['pv', 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400],
                    ],
                    type: 'bar'
                },
                color: {
                    pattern: ['#5ab1ef']
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: -90
                        },
                        height: 80
                    }
                },
                grid: {
                    x: {
                        show: true
                    }
                }
            });

            // Resize chart on sidebar width change
            sidebarToggle && sidebarToggle.addEventListener('click', function() {
                axis_tick_rotation.resize();
            });
        }

        // Axis labels
        if(axis_labels_element) {

            // Generate chart
            var axis_labels = c3.generate({
                bindto: axis_labels_element,
                size: { height: 400 },
                data: {
                    columns: [
                        ['sample1', 30, 200, 100, 400, 150, 250],
                        ['sample2', 50, 20, 10, 40, 15, 25]
                    ],
                    axes: {
                        sample1: 'y',
                        sample2: 'y2'
                    },
                    type: 'spline'
                },
                color: {
                    pattern: ['#2ec7c9','#b6a2de']
                },
                axis: {
                    x: {
                        label: 'X Label'
                    },
                    y: {
                        label: 'Y Label'
                    },
                    y2: {
                        show: true,
                        label: 'Y2 Label'
                    }
                },
                grid: {
                    y: {
                        show: true
                    }
                }
            });

            // Resize chart on sidebar width change
            sidebarToggle && sidebarToggle.addEventListener('click', function() {
                axis_labels.resize();
            });
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _axisExamples();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    С3Axis.init();
});
