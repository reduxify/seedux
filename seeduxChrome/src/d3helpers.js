import { select, cluster, hierarchy, append } from 'd3';

// default chart size and spacing constants
const config = {};

config.cozyTree = {
  CHART_WIDTH: 250,
  CHART_HEIGHT: 200,
  // multiplier between 0 and 1 that determines horizontal spacing of tree
  // generations.  Smaller is 'more compact'.
  DEPTH_SPACING_FACTOR: 0.7,
  // multiplier between 0 and 1 that determines vertical spacing of tree
  // generations.  Smaller is 'more compact'.
  BREADTH_SPACING_FACTOR: 0.5,
  NODE_RADIUS: 5,
};

config.comfyTree = {
  CHART_WIDTH: 500,
  CHART_HEIGHT: 250,
  // multiplier between 0 and 1 that determines horizontal spacing of tree
  // generations.  Smaller is 'more compact'.
  DEPTH_SPACING_FACTOR: 0.7,
  // multiplier between 0 and 1 that determines vertical spacing of tree
  // generations.  Smaller is 'more compact'.
  BREADTH_SPACING_FACTOR: 1,
  NODE_RADIUS: 15,

};

const exports = {};

// //--- D3 LOGIC -----////
// The canvas for the tree//

// takes in DOM element to be transformed into DefaultCluster,
// && data that the DefaultCluster visualizes
exports.transformVizNode = function transformVizNode(element, data, type = 'cozyTree') {
  if (type === 'comfyTree') {
    buildBasicTree(element, data, config.comfyTree);
  } else if (type === 'cozyTree') {
    buildBasicTree(element, data, config.cozyTree)
  }
};
function buildBasicList(element, data, config) {
  //
  //
  //
  // creates the cluster differently
  //
  //
  const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR,
    BREADTH_SPACING_FACTOR, NODE_RADIUS } = config;
  let svg = select(element)
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT)
    .append('g')
    .attr('transform', 'translate(20,0)');


  let ourCluster = cluster()
    .size([CHART_HEIGHT * BREADTH_SPACING_FACTOR, CHART_WIDTH * DEPTH_SPACING_FACTOR])
    .separation(function(a, b) {
      return a.parent == b.parent ? 2 : 3;
    });
  // passes hierarchiacal data into cluster to create the root node
  let nodeHierarchy = hierarchy(data);

  ourCluster(nodeHierarchy);

  // entering the nodes --> finally appending to DOM
  let nodeEnter = svg.selectAll('.node')
    .data(nodeHierarchy.descendants())
    .enter()
    .append('g')
    .attr('class', function(d) {
      return 'node' + (d.children ? 'node-internal' : 'node-leaf');
    })
    .attr('transform', function(d) {
      console.log(d.y);
      return 'translate(' + d.y + ',' + (d.x) + ')';
    });

  //creating links

  let link = svg.selectAll('.node')
    .data(nodeHierarchy.descendants()
      .slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', function(d) {
      return `M ${d.y} ${d.x}
        Q ${(d.parent.y)} ${(d.x + d.parent.x) / 2}
          ${d.parent.y} ${d.parent.x}`;
    })
    .attr('stroke-width', '1')
    .attr('stroke', 'darkblue')
    .attr('fill', 'none');

  // console.log(link)

  nodeEnter.append('circle')
    .attr('r', NODE_RADIUS)
    .style('fill', 'lightsteelblue');

  nodeEnter.append('text')
    .text(function(d) {
      return d.data.name;
    })
    .style('fill', 'darkblue');
}
function buildBasicTree(element, data, config) {
  const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR, BREADTH_SPACING_FACTOR, NODE_RADIUS } = config;
  let svg = select(element)
  .append('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT)
  .append('g')
  .attr('transform', 'translate(20,0)');
  let ourCluster = cluster()
    .size([CHART_HEIGHT * BREADTH_SPACING_FACTOR, CHART_WIDTH * DEPTH_SPACING_FACTOR])
    .separation(function(a, b) {
      return a.parent == b.parent ? 2 : 3;
    });
  // passes hierarchiacal data into cluster to create the root node
  let nodeHierarchy = hierarchy(data);

  ourCluster(nodeHierarchy);

  // entering the nodes --> finally appending to DOM
  let nodeEnter = svg.selectAll('.node')
    .data(nodeHierarchy.descendants())
    .enter()
    .append('g')
    .attr('class', function(d) {
      return 'node' + (d.children ? 'node-internal' : 'node-leaf');
    })
    .attr('transform', function(d) {
      console.log(d.y);
      return 'translate(' + d.y + ',' + (d.x) + ')';
    });

  //creating links

  let link = svg.selectAll('.node')
    .data(nodeHierarchy.descendants()
      .slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', function(d) {
      return `M ${d.y} ${d.x}
        Q ${(d.parent.y)} ${(d.x + d.parent.x) / 2}
          ${d.parent.y} ${d.parent.x}`;
    })
    .attr('stroke-width', '1')
    .attr('stroke', 'darkblue')
    .attr('fill', 'none');

  // console.log(link)

  nodeEnter.append('circle')
    .attr('r', NODE_RADIUS)
    .style('fill', 'lightsteelblue');

  nodeEnter.append('text')
    .text(function(d) {
      return d.data.name;
    })
    .style('fill', 'darkblue');
}
module.exports = exports;
