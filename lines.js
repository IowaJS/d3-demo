// Set up the margins
//
// See http://bl.ocks.org/mbostock/3019563
//
// First define the margin object with properties for the four sides (clockwise
// from the top, as in CSS).
var margin = {top: 20, right: 10, bottom: 30, left: 50};

// Then define width and height as the inner dimensions of the chart area.
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//Lastly, define svg as a G element that translates the origin to the top-left
// corner of the chart area.
var svg = d3.select("#lines").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// With this convention, all subsequent code can ignore margins. For example, to
// create x and y scales, simply say:
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

// If you want to add axes to the chart, they will be positioned correctly by
// default in the "left" and "top" orientations. For "right" or "bottom"
// orientation, translate the axis G element by the width or height,
// respectively.
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// https://github.com/mbostock/d3/wiki/Time-Formatting
var parseDate = d3.time.format("%Y%m%d").parse;

// https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-category10
var color = d3.scale.category10();

// Path generator for lines. See https://github.com/mbostock/d3/wiki/SVG-Shapes
var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

