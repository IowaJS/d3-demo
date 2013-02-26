// A bar chart

// Set up the margins
//
// See http://bl.ocks.org/mbostock/3019563
//
// First define the margin object with properties for the four sides (clockwise
// from the top, as in CSS).
var margin = {top: 20, right: 30, bottom: 30, left: 40};

// Then define width and height as the inner dimensions of the chart area.
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//Lastly, define svg as a G element that translates the origin to the top-left
// corner of the chart area.
var svg = d3.select("#bars").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// With this convention, all subsequent code can ignore margins. For example, to
// create x and y scales, simply say:
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, .2); // https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands

var y = d3.scale.linear()
    .range([height, 0]);

d3.tsv("data/bars.tsv", function(letters) {

  letters.forEach(function(d) { d.frequency = +d.frequency; });

  x.domain(letters.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(letters, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));
});
