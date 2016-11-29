var {JSONData}  = require('./jsonData.js');

(function() {
  var data = JSONData.slice();
  var format = d3.time.format("%a %b %d %Y")
  var amountFn = function(d) { return d.amount }
  var dateFn = function(d) { return format.parse(d.created_at) }


//d3.time.scale() && d3.scale.linear() === class constructors. w/ no arg, it returns the current value
  var x = d3.time.scale()
  //.range == amount of pixels you want to cover w/ the scale
    .range([10, 280])
  //domain === START and end of dataset.
    .domain(d3.extent(data, dateFn))

  var y = d3.scale.linear()
    .range([180, 10])
    .domain(d3.extent(data, amountFn))

  var svg = d3.select("#demo").append("svg:svg")
  .attr("width", 300)
  .attr("height", 200)


//ENTER == data is bound to nodes
  svg.selectAll("circle").data(data).enter()
   .append("svg:circle")
   .attr("r", 4)
   .attr("cx", function(d) { return x(dateFn(d)) })
   .attr("cy", function(d) { return y(amountFn(d)) })
})();

