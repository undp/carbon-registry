/* ------------------------------------------------------------------------------
 *
 *  # D3.js - horizontal bar chart
 *
 *  Demo d3.js horizontal bar chart setup with .csv data source
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DashboardBullets = function() {


    //
    // Setup module components
    //

    // Bullet chart
    var _BulletChart = function(element, height) {
        if (typeof d3 == 'undefined') {
            console.warn('Warning - d3.min.js is not loaded.');
            return;
        }

        // Initialize chart only if element exsists in the DOM
        if($(element).length > 0) {


            // Bullet chart core
            // ------------------------------

            function bulletCore() {

                // Construct
                d3.bullet = function() {

                    // Default layout variables
                    var orient = 'left',
                        reverse = false,
                        duration = 750,
                        ranges = bulletRanges,
                        markers = bulletMarkers,
                        measures = bulletMeasures,
                        height = 30,
                        tickFormat = null;

                    // For each small multiple…
                    function bullet(g) {
                        g.each(function(d, i) {

                            // Define variables
                            var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
                                markerz = markers.call(this, d, i).slice().sort(d3.descending),
                                measurez = measures.call(this, d, i).slice().sort(d3.descending),
                                g = d3.select(this);

                            // Compute the new x-scale.
                            var x1 = d3.scale.linear()
                                .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
                                .range(reverse ? [width, 0] : [0, width]);

                            // Retrieve the old x-scale, if this is an update.
                            var x0 = this.__chart__ || d3.scale.linear()
                                .domain([0, Infinity])
                                .range(x1.range());

                            // Stash the new scale.
                            this.__chart__ = x1;

                            // Derive width-scales from the x-scales.
                            var w0 = bulletWidth(x0),
                                w1 = bulletWidth(x1);



                            // Setup range
                            // ------------------------------

                            // Update the range rects
                            var range = g.selectAll('.bullet-range')
                                .data(rangez);

                            // Append range rect
                            range.enter()
                                .append('rect')
                                    .attr('class', function(d, i) { return 'bullet-range bullet-range-' + (i + 1); })
                                    .attr('width', w0)
                                    .attr('height', height)
                                    .attr('rx', 2)
                                    .attr('x', reverse ? x0 : 0)

                            // Add loading animation
                            .transition()
                                .duration(duration)
                                .attr('width', w1)
                                .attr('x', reverse ? x1 : 0);

                            // Add update animation
                            range.transition()
                                .duration(duration)
                                .attr('x', reverse ? x1 : 0)
                                .attr('width', w1)
                                .attr('height', height);



                            // Setup measures
                            // ------------------------------

                            // Update the measure rects
                            var measure = g.selectAll('.bullet-measure')
                                .data(measurez);

                            // Append measure rect
                            measure.enter()
                                .append('rect')
                                    .attr('class', function(d, i) { return 'bullet-measure bullet-measure-' + (i + 1); })
                                    .attr('width', w0)
                                    .attr('height', height / 5)
                                    .attr('x', reverse ? x0 : 0)
                                    .attr('y', height / 2.5)
                                    .style('shape-rendering', 'crispEdges');

                            // Add loading animation
                            measure.transition()
                                .duration(duration)
                                .attr('width', w1)
                                .attr('x', reverse ? x1 : 0);

                            // Add update animation
                            measure.transition()
                                .duration(duration)
                                .attr('width', w1)
                                .attr('height', height / 5)
                                .attr('x', reverse ? x1 : 0)
                                .attr('y', height / 2.5);



                            // Setup markers
                            // ------------------------------

                            // Update the marker lines
                            var marker = g.selectAll('.bullet-marker')
                                .data(markerz);

                            // Append marker line
                            marker.enter()
                                .append('line')
                                    .attr('class', function(d, i) { return 'bullet-marker bullet-marker-' + (i + 1); })
                                    .attr('x1', x0)
                                    .attr('x2', x0)
                                    .attr('y1', height / 6)
                                    .attr('y2', height * 5 / 6);

                            // Add loading animation
                            marker.transition()
                                .duration(duration)
                                .attr('x1', x1)
                                .attr('x2', x1);

                            // Add update animation
                            marker.transition()
                                .duration(duration)
                                .attr('x1', x1)
                                .attr('x2', x1)
                                .attr('y1', height / 6)
                                .attr('y2', height * 5 / 6);



                            // Setup axes
                            // ------------------------------

                            // Compute the tick format.
                            var format = tickFormat || x1.tickFormat(8);

                            // Update the tick groups.
                            var tick = g.selectAll('.bullet-tick')
                                .data(x1.ticks(8), function(d) {
                                    return this.textContent || format(d);
                                });

                            // Initialize the ticks with the old scale, x0.
                            var tickEnter = tick.enter()
                                .append('g')
                                    .attr('class', 'bullet-tick')
                                    .attr('transform', bulletTranslate(x0))
                                    .style('opacity', 1e-6);

                            // Append line
                            tickEnter.append('line')
                                .attr('y1', height)
                                .attr('y2', (height * 7 / 6) + 3);

                            // Append text
                            tickEnter.append('text')
                                .attr('text-anchor', 'middle')
                                .attr('dy', '1em')
                                .attr('y', (height * 7 / 6) + 4)
                                .text(format);

                            // Transition the entering ticks to the new scale, x1.
                            tickEnter.transition()
                                .duration(duration)
                                .attr('transform', bulletTranslate(x1))
                                .style('opacity', 1);

                            // Transition the updating ticks to the new scale, x1.
                            var tickUpdate = tick.transition()
                                .duration(duration)
                                .attr('transform', bulletTranslate(x1))
                                .style('opacity', 1);

                            // Update tick line
                            tickUpdate.select('line')
                                .attr('y1', height + 3)
                                .attr('y2', (height * 7 / 6) + 3);

                            // Update tick text
                            tickUpdate.select('text')
                                .attr('y', (height * 7 / 6) + 4);

                            // Transition the exiting ticks to the new scale, x1.
                            tick.exit()
                                .transition()
                                    .duration(duration)
                                    .attr('transform', bulletTranslate(x1))
                                    .style('opacity', 1e-6)
                                    .remove();



                            // Resize chart
                            // ------------------------------

                            // Call function on window resize
                            window.addEventListener('resize', resizeBulletsCore);

                            // Call function on sidebar width change
                            var sidebarToggle = document.querySelector('.sidebar-control');
                            sidebarToggle && sidebarToggle.addEventListener('click', resizeBulletsCore);

                            // Resize function
                            // 
                            // Since D3 doesn't support SVG resize by default,
                            // we need to manually specify parts of the graph that need to 
                            // be updated on window resize
                            function resizeBulletsCore() {

                                // Layout variables
                                width = d3.select('#bullets').node().getBoundingClientRect().width - margin.left - margin.right;
                                w1 = bulletWidth(x1);


                                // Layout
                                // -------------------------

                                // Horizontal range
                                x1.range(reverse ? [width, 0] : [0, width]);


                                // Chart elements
                                // -------------------------

                                // Measures
                                g.selectAll('.bullet-measure').attr('width', w1).attr('x', reverse ? x1 : 0);

                                // Ranges
                                g.selectAll('.bullet-range').attr('width', w1).attr('x', reverse ? x1 : 0);

                                // Markers
                                g.selectAll('.bullet-marker').attr('x1', x1).attr('x2', x1)

                                // Ticks
                                g.selectAll('.bullet-tick').attr('transform', bulletTranslate(x1))
                            }
                        });

                        d3.timer.flush();
                    }


                    // Constructor functions
                    // ------------------------------

                    // Left, right, top, bottom
                    bullet.orient = function(x) {
                        if (!arguments.length) return orient;
                        orient = x;
                        reverse = orient == 'right' || orient == 'bottom';
                        return bullet;
                    };

                    // Ranges (bad, satisfactory, good)
                    bullet.ranges = function(x) {
                        if (!arguments.length) return ranges;
                        ranges = x;
                        return bullet;
                    };

                    // Markers (previous, goal)
                    bullet.markers = function(x) {
                        if (!arguments.length) return markers;
                        markers = x;
                        return bullet;
                    };

                    // Measures (actual, forecast)
                    bullet.measures = function(x) {
                        if (!arguments.length) return measures;
                        measures = x;
                        return bullet;
                    };

                    // Width
                    bullet.width = function(x) {
                        if (!arguments.length) return width;
                        width = x;
                        return bullet;
                    };

                    // Height
                    bullet.height = function(x) {
                        if (!arguments.length) return height;
                        height = x;
                        return bullet;
                    };

                    // Axex tick format
                    bullet.tickFormat = function(x) {
                        if (!arguments.length) return tickFormat;
                        tickFormat = x;
                        return bullet;
                    };

                    // Transition duration
                    bullet.duration = function(x) {
                        if (!arguments.length) return duration;
                        duration = x;
                        return bullet;
                    };

                    return bullet;
                };

                // Ranges
                function bulletRanges(d) {
                    return d.ranges;
                }

                // Markers
                function bulletMarkers(d) {
                    return d.markers;
                }

                // Measures
                function bulletMeasures(d) {
                    return d.measures;
                }

                // Positioning
                function bulletTranslate(x) {
                    return function(d) {
                        return 'translate(' + x(d) + ',0)';
                    };
                }

                // Width
                function bulletWidth(x) {
                    var x0 = x(0);
                    return function(d) {
                        return Math.abs(x(d) - x0);
                    };
                }
            }
            bulletCore();



            // Basic setup
            // ------------------------------

            // Main variables
            var d3Container = d3.select(element),
                margin = {top: 20, right: 10, bottom: 35, left: 10},
                width = width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
                height = height - margin.top - margin.bottom;



            // Construct chart layout
            // ------------------------------

            var chart = d3.bullet()
                .width(width)
                .height(height);



            // Load data
            // ------------------------------

            d3.json('../../../../global_assets/demo_data/dashboard/bullets.json', function(error, data) {

                // Show what's wrong if error
                if (error) return console.error(error);


                // Create SVG
                // ------------------------------

                // SVG container
                var container = d3Container.selectAll('svg')
                    .data(data)
                    .enter()
                    .append('svg');

                // SVG group
                var svg = container
                    .attr('class', function(d, i) { return 'bullet-' + (i + 1); })
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                        .call(chart);



                // Add title
                // ------------------------------

                // Title group
                var title = svg.append('g')
                    .style('text-anchor', 'start');

                // Bullet title text
                title.append('text')
                    .attr('class', 'bullet-title')
                    .attr('y', -10)
                    .text(function(d) { return d.title; });

                // Bullet subtitle text
                title.append('text')
                    .attr('class', 'bullet-subtitle')
                    .attr('x', width)
                    .attr('y', -10)
                    .style('text-anchor', 'end')
                    .text(function(d) { return d.subtitle; })
                    .style('opacity', 0)
                    .transition()
                        .duration(500)
                        .delay(500)
                        .style('opacity', 0.75);



                // Add random transition for demo
                // ------------------------------

                // Bind data
                var interval = function() {
                    svg.datum(randomize).call(chart.duration(750));
                }

                // Set interval
                var intervalIds = [];
                intervalIds.push(
                    setInterval(function() {
                        interval()
                    }, 5000)
                );

                // Enable or disable real time update
                document.getElementById('realtime').onchange = function() {
                    if(realtime.checked) {
                        intervalIds.push(setInterval(function() { interval() }, 5000));
                    }
                    else {
                        for (var i=0; i < intervalIds.length; i++) {
                            clearInterval(intervalIds[i]);
                        }
                    }
                };



                // Resize chart
                // ------------------------------

                // Call function on window resize
                window.addEventListener('resize', bulletResize);

                // Call function on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', bulletResize);

                // Resize function
                // 
                // Since D3 doesn't support SVG resize by default,
                // we need to manually specify parts of the graph that need to 
                // be updated on window resize
                function bulletResize() {

                    // Layout variables
                    width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


                    // Layout
                    // -------------------------

                    // Main svg width
                    container.attr('width', width + margin.left + margin.right);

                    // Width of appended group
                    svg.attr('width', width + margin.left + margin.right);


                    // Chart elements
                    // -------------------------

                    // Subtitle
                    svg.selectAll('.bullet-subtitle').attr('x', width);
                }
            });



            // Randomizers
            // ------------------------------

            function randomize(d) {
                if (!d.randomizer) d.randomizer = randomizer(d);
                d.ranges = d.ranges.map(d.randomizer);
                d.markers = d.markers.map(d.randomizer);
                d.measures = d.measures.map(d.randomizer);
                return d;
            }
            function randomizer(d) {
                var k = d3.max(d.ranges) * .2;
                return function(d) {
                    return Math.max(0, d + k * (Math.random() - .5));
                };
            }
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _BulletChart("#bullets", 80);
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DashboardBullets.init();
});
