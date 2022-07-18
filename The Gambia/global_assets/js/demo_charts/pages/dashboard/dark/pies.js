/* ------------------------------------------------------------------------------
 *
 *  # D3.js - horizontal bar chart
 *
 *  Demo d3.js horizontal bar chart setup with .csv data source
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DashboardPies = function() {


    //
    // Setup module components
    //

    // Small progress pie chart
    var _ProgressPieChart = function(element, width, height, color) {
        if (typeof d3 == 'undefined') {
            console.warn('Warning - d3.min.js is not loaded.');
            return;
        }

        // Initialize chart only if element exsists in the DOM
        if($(element).length > 0) {


            // Basic setup
            // ------------------------------

            // Main variables
            var d3Container = d3.select(element),
                border = 2,
                radius = Math.min(width / 2, height / 2) - border,
                twoPi = 2 * Math.PI,
                progress = $(element).data('progress'),
                total = 100;



            // Construct chart layout
            // ------------------------------

            // Arc
            var arc = d3.svg.arc()
                .startAngle(0)
                .innerRadius(0)
                .outerRadius(radius)
                .endAngle(function(d) {
                  return (d.value / d.size) * 2 * Math.PI; 
                })



            // Create chart
            // ------------------------------

            // Add svg element
            var container = d3Container.append('svg');

            // Add SVG group
            var svg = container
                .attr('width', width)
                .attr('height', height)
                .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');



            //
            // Append chart elements
            //

            // Progress group
            var meter = svg.append('g')
                .attr('class', 'progress-meter');

            // Background
            meter.append('path')
                .attr('d', arc.endAngle(twoPi))
                .style('fill', 'none')
                .style('stroke', color)
                .style('stroke-width', 1.5);

            // Foreground
            var foreground = meter.append('path')
                .style('fill', color);

            // Animate foreground path
            foreground
                .transition()
                    .ease('cubic-out')
                    .duration(2500)
                    .attrTween('d', arcTween);


            // Tween arcs
            function arcTween() {
                var i = d3.interpolate(0, progress);
                return function(t) {
                    var currentProgress = progress / (100/t);
                    var endAngle = arc.endAngle(twoPi * (currentProgress));
                    return arc(i(endAngle));
                };
            }
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _ProgressPieChart('#today-progress', 20, 20, '#a2f19f');
            _ProgressPieChart('#yesterday-progress', 20, 20, '#a2f19f');
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DashboardPies.init();
});
