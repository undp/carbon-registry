/* ------------------------------------------------------------------------------
 *
 *  # D3.js - horizontal bar chart
 *
 *  Demo d3.js horizontal bar chart setup with .csv data source
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DashboardHeatmaps = function() {


    //
    // Setup module components
    //

    // Daily sales heatmap
    var _AppSalesHeatmap = function(element) {
        if (typeof d3 == 'undefined') {
            console.warn('Warning - d3.min.js is not loaded.');
            return;
        }

        // Initialize chart only if element exsists in the DOM
        if($(element).length > 0) {

            // Load data
            d3.csv('../../../../global_assets/demo_data/dashboard/app_sales_heatmap.csv', function(error, data) {


                // Bind data
                // ------------------------------

                // Nest data
                var nested_data = d3.nest().key(function(d) { return d.app; }),
                    nest = nested_data.entries(data);

                // Format date
                var format = d3.time.format('%Y/%m/%d %H:%M'),
                    formatTime = d3.time.format('%H:%M');

                // Pull out values
                data.forEach(function(d, i) { 
                    d.date = format.parse(d.date),
                    d.value = +d.value
                });



                // Layout setup
                // ------------------------------

                // Define main variables
                var d3Container = d3.select(element);
                    margin = { top: 20, right: 0, bottom: 30, left: 0 },
                    width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
                    gridSize = width / new Date(data[data.length - 1].date).getHours(), // dynamically set grid size
                    rowGap = 40, // vertical gap between rows
                    height = (rowGap + gridSize) * (d3.max(nest, function(d,i) {return i+1})) - margin.top,
                    buckets = 5, // number of colors in range
                    colors = ['#DCEDC8','#C5E1A5','#9CCC65','#7CB342','#558B2F'];



                // Construct scales
                // ------------------------------

                // Horizontal
                var x = d3.time.scale().range([0, width]);

                // Vertical
                var y = d3.scale.linear().range([height, 0]);

                // Colors
                var colorScale = d3.scale.quantile()
                    .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                    .range(colors);



                // Set input domains
                // ------------------------------

                // Horizontal
                x.domain([new Date(data[0].date), d3.time.hour.offset(new Date(data[data.length - 1].date), 1)]);

                // Vertical
                y.domain([0, d3.max(data, function(d) { return d.app; })]);



                // Create chart
                // ------------------------------

                // Container
                var container = d3Container.append('svg');

                // SVG element
                var svg = container
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.bottom)
                    .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



                //
                // Append chart elements
                //

                // App groups
                // ------------------------------

                // Add groups for each app
                var hourGroup = svg.selectAll('.hour-group')
                    .data(nest)
                    .enter()
                    .append('g')
                        .attr('class', 'hour-group')
                        .attr('transform', function(d, i) { return 'translate(0, ' + ((gridSize + rowGap) * i) +')'; });

                // Add app name
                hourGroup
                    .append('text')
                        .attr('class', 'd3-text')
                        .attr('x', 0)
                        .attr('y', -(margin.top/2))
                        .text(function (d, i) { return d.key; });

                // Sales count text
                hourGroup
                    .append('text')
                        .attr('class', 'sales-count d3-text')
                        .attr('x', width)
                        .attr('y', -(margin.top/2))
                        .style('text-anchor', 'end')
                        .text(function (d, i) { return d3.sum(d.values, function(d) { return d.value; }) + ' sales today' });



                // Add map elements
                // ------------------------------

                // Add map squares
                var heatMap = hourGroup.selectAll('.heatmap-hour')
                    .data(function(d) {return d.values})
                    .enter()
                    .append('rect')
                        .attr('x', function(d,i) { return x(d.date); })
                        .attr('y', 0)
                        .attr('class', 'heatmap-hour d3-slice-border d3-bg')
                        .attr('width', gridSize)
                        .attr('height', gridSize)
                        .style('cursor', 'pointer');

                // Add loading transition    
                heatMap.transition()
                    .duration(250)
                    .delay(function(d, i) { return i * 20; })
                    .style('fill', function(d) { return colorScale(d.value); })

                // Add user interaction
                hourGroup.each(function(d) {
                    heatMap
                        .on('mouseover', function (d, i) {
                            d3.select(this).style('opacity', 0.75);
                            d3.select(this.parentNode).select('.sales-count').text(function(d) { return d.values[i].value + ' sales at ' + formatTime(d.values[i].date); })
                        })
                        .on('mouseout', function (d, i) {
                            d3.select(this).style('opacity', 1);
                            d3.select(this.parentNode).select('.sales-count').text(function (d, i) { return d3.sum(d.values, function(d) { return d.value; }) + ' sales today' })
                        })
                })



                // Add legend
                // ------------------------------

                // Get min and max values
                var minValue, maxValue;
                data.forEach(function(d, i) { 
                    maxValue = d3.max(data, function (d) { return d.value; });
                    minValue = d3.min(data, function (d) { return d.value; });
                });

                // Place legend inside separate group
                var legendGroup = svg.append('g')
                    .attr('class', 'legend-group')
                    .attr('width', width)
                    .attr('transform', 'translate(' + ((width/2) - ((buckets * gridSize))/2) + ',' + (height + (margin.bottom - margin.top)) + ')');

                // Then group legend elements
                var legend = legendGroup.selectAll('.heatmap-legend')
                    .data([0].concat(colorScale.quantiles()), function(d) { return d; })
                    .enter()
                    .append('g')
                        .attr('class', 'heatmap-legend');

                // Add legend items
                legend.append('rect')
                    .attr('class', 'heatmap-legend-item d3-slice-border')
                    .attr('x', function(d, i) { return gridSize * i; })
                    .attr('y', -8)
                    .attr('width', gridSize)
                    .attr('height', 5)
                    .style('stroke-width', 1)
                    .style('fill', function(d, i) { return colors[i]; });

                // Add min value text label
                legendGroup.append('text')
                    .attr('class', 'min-legend-value d3-text')
                    .attr('x', -10)
                    .attr('y', -2)
                    .style('text-anchor', 'end')
                    .style('font-size', 11)
                    .text(minValue);

                // Add max value text label
                legendGroup.append('text')
                    .attr('class', 'max-legend-value d3-text')
                    .attr('x', (buckets * gridSize) + 10)
                    .attr('y', -2)
                    .style('font-size', 11)
                    .text(maxValue);



                // Resize chart
                // ------------------------------

                // Call function on window resize
                window.addEventListener('resize', resizeHeatmap);

                // Call function on sidebar width change
                var sidebarToggle = document.querySelector('.sidebar-control');
                sidebarToggle && sidebarToggle.addEventListener('click', resizeHeatmap);

                // Resize function
                // 
                // Since D3 doesn't support SVG resize by default,
                // we need to manually specify parts of the graph that need to 
                // be updated on window resize
                function resizeHeatmap() {

                    // Layout
                    // -------------------------

                    // Width
                    width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,

                    // Grid size
                    gridSize = width / new Date(data[data.length - 1].date).getHours(),

                    // Height
                    height = (rowGap + gridSize) * (d3.max(nest, function(d,i) {return i+1})) - margin.top,

                    // Main svg width
                    container.attr('width', width + margin.left + margin.right).attr('height', height + margin.bottom);

                    // Width of appended group
                    svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.bottom);

                    // Horizontal range
                    x.range([0, width]);


                    // Chart elements
                    // -------------------------

                    // Groups for each app
                    svg.selectAll('.hour-group')
                        .attr('transform', function(d, i) { return 'translate(0, ' + ((gridSize + rowGap) * i) +')'; });

                    // Map squares
                    svg.selectAll('.heatmap-hour')
                        .attr('width', gridSize)
                        .attr('height', gridSize)
                        .attr('x', function(d,i) { return x(d.date); });

                    // Legend group
                    svg.selectAll('.legend-group')
                        .attr('transform', 'translate(' + ((width/2) - ((buckets * gridSize))/2) + ',' + (height + margin.bottom - margin.top) + ')');

                    // Sales count text
                    svg.selectAll('.sales-count')
                        .attr('x', width);

                    // Legend item
                    svg.selectAll('.heatmap-legend-item')
                        .attr('width', gridSize)
                        .attr('x', function(d, i) { return gridSize * i; });

                    // Max value text label
                    svg.selectAll('.max-legend-value')
                        .attr('x', (buckets * gridSize) + 10);
                }
            });
        }
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _AppSalesHeatmap('#sales-heatmap');
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DashboardHeatmaps.init();
});
