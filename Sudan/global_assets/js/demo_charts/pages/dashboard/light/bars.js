/* ------------------------------------------------------------------------------
 *
 *  # D3.js - horizontal bar chart
 *
 *  Demo d3.js horizontal bar chart setup with .csv data source
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DashboardBars = function() {


    //
    // Setup module components
    //

    // Bar charts
    var _BarChart = function(element, barQty, height, animate, easing, duration, delay, color, tooltip) {
        if (typeof d3 == 'undefined') {
            console.warn('Warning - d3.min.js is not loaded.');
            return;
        }

        // Initialize chart only if element exsists in the DOM
        if($(element).length > 0) {


            // Basic setup
            // ------------------------------

            // Add data set
            var bardata = [];
            for (var i=0; i < barQty; i++) {
                bardata.push(Math.round(Math.random()*10) + 10);
            }

            // Main variables
            var d3Container = d3.select(element),
                width = d3Container.node().getBoundingClientRect().width;
            


            // Construct scales
            // ------------------------------

            // Horizontal
            var x = d3.scale.ordinal()
                .rangeBands([0, width], 0.3);

            // Vertical
            var y = d3.scale.linear()
                .range([0, height]);



            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain(d3.range(0, bardata.length));

            // Vertical
            y.domain([0, d3.max(bardata)]);



            // Create chart
            // ------------------------------

            // Add svg element
            var container = d3Container.append('svg');

            // Add SVG group
            var svg = container
                .attr('width', width)
                .attr('height', height)
                .append('g');



            //
            // Append chart elements
            //

            // Bars
            var bars = svg.selectAll('rect')
                .data(bardata)
                .enter()
                .append('rect')
                    .attr('class', 'd3-random-bars')
                    .attr('width', x.rangeBand())
                    .attr('x', function(d,i) {
                        return x(i);
                    })
                    .style('fill', color);



            // Tooltip
            // ------------------------------

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0]);

            // Show and hide
            if(tooltip == 'hours' || tooltip == 'goal' || tooltip == 'members') {
                bars.call(tip)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
            }

            // Daily meetings tooltip content
            if(tooltip == 'hours') {
                tip.html(function (d, i) {
                    return '<div class="text-center">' +
                            '<h6 class="m-0">' + d + '</h6>' +
                            '<span class="font-size-sm">meetings</span>' +
                            '<div class="font-size-sm">' + i + ':00' + '</div>' +
                        '</div>'
                });
            }

            // Statements tooltip content
            if(tooltip == 'goal') {
                tip.html(function (d, i) {
                    return '<div class="text-center">' +
                            '<h6 class="m-0">' + d + '</h6>' +
                            '<span class="font-size-sm">statements</span>' +
                            '<div class="font-size-sm">' + i + ':00' + '</div>' +
                        '</div>'
                });
            }

            // Online members tooltip content
            if(tooltip == 'members') {
                tip.html(function (d, i) {
                    return '<div class="text-center">' +
                            '<h6 class="m-0">' + d + '0' + '</h6>' +
                            '<span class="font-size-sm">members</span>' +
                            '<div class="font-size-sm">' + i + ':00' + '</div>' +
                        '</div>'
                });
            }



            // Bar loading animation
            // ------------------------------

            // Choose between animated or static
            if(animate) {
                withAnimation();
            } else {
                withoutAnimation();
            }

            // Animate on load
            function withAnimation() {
                bars
                    .attr('height', 0)
                    .attr('y', height)
                    .transition()
                        .attr('height', function(d) {
                            return y(d);
                        })
                        .attr('y', function(d) {
                            return height - y(d);
                        })
                        .delay(function(d, i) {
                            return i * delay;
                        })
                        .duration(duration)
                        .ease(easing);
            }

            // Load without animation
            function withoutAnimation() {
                bars
                    .attr('height', function(d) {
                        return y(d);
                    })
                    .attr('y', function(d) {
                        return height - y(d);
                    })
            }



            // Resize chart
            // ------------------------------

            // Call function on window resize
            window.addEventListener('resize', barsResize);

            // Call function on sidebar width change
            var sidebarToggle = document.querySelector('.sidebar-control');
            sidebarToggle && sidebarToggle.addEventListener('click', barsResize);

            // Resize function
            // 
            // Since D3 doesn't support SVG resize by default,
            // we need to manually specify parts of the graph that need to 
            // be updated on window resize
            function barsResize() {

                // Layout variables
                width = d3Container.node().getBoundingClientRect().width;


                // Layout
                // -------------------------

                // Main svg width
                container.attr('width', width);

                // Width of appended group
                svg.attr('width', width);

                // Horizontal range
                x.rangeBands([0, width], 0.3);


                // Chart elements
                // -------------------------

                // Bars
                svg.selectAll('.d3-random-bars')
                    .attr('width', x.rangeBand())
                    .attr('x', function(d,i) {
                        return x(i);
                    });
            }
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _BarChart('#hours-available-bars', 24, 40, true, 'elastic', 1200, 50, '#EC407A', 'hours');
            _BarChart('#goal-bars', 24, 40, true, 'elastic', 1200, 50, '#5C6BC0', 'goal');
            _BarChart('#members-online', 24, 50, true, 'elastic', 1200, 50, 'rgba(255,255,255,0.5)', 'members');
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DashboardBars.init();
});
