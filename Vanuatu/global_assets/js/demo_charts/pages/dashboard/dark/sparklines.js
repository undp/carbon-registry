/* ------------------------------------------------------------------------------
 *
 *  # D3.js - horizontal bar chart
 *
 *  Demo d3.js horizontal bar chart setup with .csv data source
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DashboardSparklines = function() {


    //
    // Setup module components
    //

    // Sparklines chart
    var _chartSparkline = function(element, chartType, qty, height, interpolation, duration, interval, color) {
        if (typeof d3 == 'undefined') {
            console.warn('Warning - d3.min.js is not loaded.');
            return;
        }

        // Initialize chart only if element exsists in the DOM
        if($(element).length > 0) {


            // Basic setup
            // ------------------------------

            // Define main variables
            var d3Container = d3.select(element),
                margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
                height = height - margin.top - margin.bottom;


            // Generate random data (for demo only)
            var data = [];
            for (var i=0; i < qty; i++) {
                data.push(Math.floor(Math.random() * qty) + 5)
            }


            // Construct scales
            // ------------------------------

            // Horizontal
            var x = d3.scale.linear().range([0, width]);

            // Vertical
            var y = d3.scale.linear().range([height - 5, 5]);


            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain([1, qty - 3])

            // Vertical
            y.domain([0, qty])
                


            // Construct chart layout
            // ------------------------------

            // Line
            var line = d3.svg.line()
                .interpolate(interpolation)
                .x(function(d, i) { return x(i); })
                .y(function(d, i) { return y(d); });

            // Area
            var area = d3.svg.area()
                .interpolate(interpolation)
                .x(function(d, i) { 
                    return x(i); 
                })
                .y0(height)
                .y1(function(d) { 
                    return y(d); 
                });



            // Create SVG
            // ------------------------------

            // Container
            var container = d3Container.append('svg');

            // SVG element
            var svg = container
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append("g")
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



            // Add mask for animation
            // ------------------------------

            // Add clip path
            var clip = svg.append('defs')
                .append('clipPath')
                .attr('id', function(d, i) { return 'load-clip-' + element.substring(1) })

            // Add clip shape
            var clips = clip.append('rect')
                .attr('class', 'load-clip')
                .attr('width', 0)
                .attr('height', height);

            // Animate mask
            clips
                .transition()
                    .duration(1000)
                    .ease('linear')
                    .attr('width', width);



            //
            // Append chart elements
            //

            // Main path
            var path = svg.append('g')
                .attr('clip-path', function(d, i) { return 'url(#load-clip-' + element.substring(1) + ')'})
                .append('path')
                    .datum(data)
                    .attr('transform', 'translate(' + x(0) + ',0)');

            // Add path based on chart type
            if(chartType == 'area') {
                path.attr('d', area).attr('class', 'd3-area').style('fill', color); // area
            }
            else {
                path.attr('d', line).attr('class', 'd3-line d3-line-strong').style('stroke', color); // line
            }

            // Animate path
            path
                .style('opacity', 0)
                .transition()
                    .duration(750)
                    .style('opacity', 1);



            // Set update interval. For demo only
            // ------------------------------

            setInterval(function() {

                // push a new data point onto the back
                data.push(Math.floor(Math.random() * qty) + 5);

                // pop the old data point off the front
                data.shift();

                update();

            }, interval);



            // Update random data. For demo only
            // ------------------------------

            function update() {

                // Redraw the path and slide it to the left
                path
                    .attr('transform', null)
                    .transition()
                        .duration(duration)
                        .ease('linear')
                        .attr('transform', 'translate(' + x(0) + ',0)');

                // Update path type
                if(chartType == 'area') {
                    path.attr('d', area).attr('class', 'd3-area').style('fill', color)
                }
                else {
                    path.attr('d', line).attr('class', 'd3-line d3-line-strong').style('stroke', color);
                }
            }



            // Resize chart
            // ------------------------------

            // Call function on window resize
            window.addEventListener('resize', resizeSparklines);

            // Call function on sidebar width change
            var sidebarToggle = document.querySelector('.sidebar-control');
            sidebarToggle && sidebarToggle.addEventListener('click', resizeSparklines);

            // Resize function
            // 
            // Since D3 doesn't support SVG resize by default,
            // we need to manually specify parts of the graph that need to 
            // be updated on window resize
            function resizeSparklines() {

                // Layout variables
                width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


                // Layout
                // -------------------------

                // Main svg width
                container.attr('width', width + margin.left + margin.right);

                // Width of appended group
                svg.attr('width', width + margin.left + margin.right);

                // Horizontal range
                x.range([0, width]);


                // Chart elements
                // -------------------------

                // Clip mask
                clips.attr('width', width);

                // Line
                svg.select('.d3-line').attr('d', line);

                // Area
                svg.select('.d3-area').attr('d', area);
            }
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _chartSparkline('#new-visitors', 'line', 30, 35, 'basis', 750, 2000, '#81c784');
            _chartSparkline('#new-sessions', 'line', 30, 35, 'basis', 750, 2000, '#ffb74d');
            _chartSparkline('#total-online', 'line', 30, 35, 'basis', 750, 2000, '#4fc3f7');
            _chartSparkline('#server-load', 'area', 30, 50, 'basis', 750, 2000, 'rgba(255,255,255,0.5)');
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DashboardSparklines.init();
});
