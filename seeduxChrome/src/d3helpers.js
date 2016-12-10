import { select, tree, hierarchy, append } from 'd3';

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

// config.list = {
//   CHART_WIDTH: 250,
//   CHART_HEIGHT: 250,
//   DEPTH_SPACING_FACTOR: 0.25,
//   BREADTH_SPACING_FACTOR: 0.25,
//   RECT_HEIGHT: 20,
//   RECT_WIDTH: 50,

// };

const exports = {};

// //--- D3 LOGIC -----////
// The canvas for the tree//

// takes in DOM element to be transformed into DefaultCluster,
// && data that the DefaultCluster visualizes
exports.transformVizNode = function transformVizNode(element, data, type = 'cozyTree', searchTerm = null) {
  if (type === 'comfyTree') {
    buildBasicTree(element, data, config.comfyTree, searchTerm);
  } else if (type === 'cozyTree') {
    buildBasicTree(element, data, config.cozyTree, searchTerm)
  }
  // else if (type === 'list') {
  //   buildBasicList(element, data, config.list, searchTerm);
  // }
};
// function buildBasicList(element, data, config, searchTerm) {
//   //
//   //
//   //
//   // creates the cluster differently
//   //
//   //
//   const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR,
//     BREADTH_SPACING_FACTOR, RECT_HEIGHT, RECT_WIDTH } = config;
//   let svg = select(element)
//     .append('svg')
//     .attr('width', CHART_WIDTH)
//     .attr('height', CHART_HEIGHT)
//     .append('g')
//     .attr('transform', 'translate(20,0)');


//   let ourCluster = cluster()
//     .size([CHART_HEIGHT * BREADTH_SPACING_FACTOR, CHART_WIDTH * DEPTH_SPACING_FACTOR])
//     .separation(function(a, b) {
//       return a.parent == b.parent ? 2 : 3;
//     });
//   // passes hierarchiacal data into cluster to create the root node
//   let nodeHierarchy = hierarchy(data);

//   ourCluster(nodeHierarchy);

//   // entering the nodes --> finally appending to DOM
//   let nodeEnter = svg.selectAll('.node')
//     .data(nodeHierarchy.descendants())
//     .enter()
//     .append('g')
//     .attr('class', function(d) {
//       return 'node' + (d.children ? 'node-internal' : 'node-leaf');
//     })
//     .attr('transform', function(d) {
//       console.log(d.y);
//       return 'translate(' + d.y + ',' + (d.x) + ')';
//     });

//   //creating links

//   let link = svg.selectAll('.node')
//     .data(nodeHierarchy.descendants()
//       .slice(1))
//     .enter()
//     .append('path')
//     .attr('class', 'link')
//     .attr('d', function(d) {
//       return `M ${d.y} ${d.x}
//         Q ${(d.parent.y)} ${(d.x + d.parent.x) / 2}
//           ${d.parent.y} ${d.parent.x}`;
//     })
//     .attr('stroke-width', '1')
//     .attr('stroke', 'darkblue')
//     .attr('fill', 'none');

//   // console.log(link)

//     nodeEnter.append('rect')
//       .attr('y', -RECT_HEIGHT / 2)
//       .attr('height', RECT_HEIGHT)
//       .attr('width', RECT_WIDTH)
//       .style('fill', 'lightsteelblue');

//   nodeEnter.append('text')
//     .text(function(d) {
//       return d.data.name;
//     })
//     .style('fill', 'darkblue');
// }

function buildBasicTree(element, data, config, searchTerm) {
  const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR, BREADTH_SPACING_FACTOR, NODE_RADIUS } = config;
  let svg = select(element)
  .append('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT)
  .append('g')
  .attr('transform', 'translate(20,0)');
  let ourCluster = tree()
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
    .style('fill', function(d) {
      let color = 'lightsteelblue';
      if (searchTerm) {
        if (d.data.children) {
          d.data.children.forEach(node => {
            if (node.name === searchTerm) {
              color = 'yellow';
            }
            else if (node.children) {
              node.children.forEach(childNode => {
                if (childNode.name === searchTerm) {
                  color = 'yellow';
                }
              })
            }
          })
        }
        else if (d.data.name === searchTerm) {
          color = 'yellow';
        }
      }
      return color;
    });

  nodeEnter.append('text')
    .text(function(d) {
      return d.data.name;
    })
    .style('fill', 'darkblue');
}
module.exports = exports;
