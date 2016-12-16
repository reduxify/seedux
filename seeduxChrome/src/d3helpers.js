import { select, tree, hierarchy, append, layout } from 'd3';

// default chart size and spacing constants
function getConfig(type, zoomLevel) {
  if (type === 'cozyTree') return {
    CHART_WIDTH: 250,
    CHART_HEIGHT: 200,
    // multiplier between 0 and 1 that determines horizontal spacing of tree
    // generations.  Smaller is 'more compact'.
    DEPTH_SPACING_FACTOR: 0.7,
    // multiplier between 0 and 1 that determines vertical spacing of tree
    // generations.  Smaller is 'more compact'.
    BREADTH_SPACING_FACTOR: 0.5,
    NODE_RADIUS: 5,
    LINK_WEIGHT: 2,
  };

  else if (type === 'fancyTree') return {
  CHART_WIDTH: Math.max(500, 1000 * zoomLevel),
  CHART_HEIGHT: Math.max(500, 1000 * zoomLevel),
  // multiplier between 0 and 1 that determines horizontal spacing of tree
  // generations.  Smaller is 'more compact'.
  DEPTH_SPACING_FACTOR: 0.25,
  // multiplier between 0 and 1 that determines vertical spacing of tree
  // generations.  Smaller is 'more compact'.
  BREADTH_SPACING_FACTOR: 0.4,
  NODE_RADIUS: 7,
  LINK_WEIGHT: 1,
};

if (type === 'comfyTree') return {
  CHART_WIDTH: Math.max(250, 500 * zoomLevel),
  CHART_HEIGHT: Math.max(500, 1000 * zoomLevel),
  // multiplier between 0 and 1 that determines horizontal spacing of tree
  // generations.  Smaller is 'more compact'.
  DEPTH_SPACING_FACTOR: 0.7,
  // multiplier between 0 and 1 that determines vertical spacing of tree
  // generations.  Smaller is 'more compact'.
  BREADTH_SPACING_FACTOR: 1,
  NODE_RADIUS: 10,
  LINK_WEIGHT: 1,

};

if (type === 'basicList') return {

  CHART_WIDTH: 250,
  CHART_HEIGHT: 250,
  DEPTH_SPACING_FACTOR: 0.25,
  BREADTH_SPACING_FACTOR: 0.25,
  RECT_HEIGHT: 20,
  RECT_WIDTH: 50,

};
}
const exports = {};

// //--- D3 LOGIC -----////
// The canvas for the tree//

// takes in DOM element to be transformed into DefaultCluster,
// && data that the DefaultCluster visualizes

exports.transformVizNode = function transformVizNode(element, data, type = 'cozyTree', zoomLevel = 1, d3Table, searchTerms = null) {
  console.log('zoomLevel: ', zoomLevel);
  if (type === 'comfyTree') {
    buildBasicTree(element, data, getConfig(type, zoomLevel), d3Table, searchTerms);
  } else if (type === 'cozyTree') {
    buildBasicTree(element, data, getConfig(type, zoomLevel), d3Table, searchTerms);
  }
  else if (type === 'fancyTree') {
    buildFancyTree(element, data, getConfig(type, zoomLevel), d3Table, searchTerms);
  }
};
function buildBasicList(element, data, config, d3Table, searchTerms) {
  removeHiddenClasses();
  let svg = select(element)
  .append('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT)
  .append('g')
  .attr('transform', 'translate(20,0)');

  var layout = layout.indent()
  .children(function(d) { return d.children; })
  .nodeSize([10, 15])
  .separation(function(node, previousNode) { return node.parent === previousNode.parent || node.parent === previousNode ? 1 : 2; });

  const nodes = layout(data);

  labels = svg.selectAll(".label")
        .data(nodes, function(d) { return d.name });

    labels.enter()
        .append("text")
        .attr({
          "class": "label",
          dy: ".35em",
          transform: function(d) { return "translate(" + (d.x - 200) + "," + d.y + ")"; }
        })
        .style("font-weight", function(d) { return d.Country ? null : "bold" })
        .text(function(d) { return id(d); });
}

function buildBasicTree(element, data, config, d3Table, searchTerms = false) {
  const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR, BREADTH_SPACING_FACTOR, NODE_RADIUS, LINK_WEIGHT } = config;
  removeHiddenClasses();
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
  // passes hierarchiacal data into tree to create the root node

  let nodeHierarchy = hierarchy(data);
  // let nodeHierarchy = data;
  ourCluster(nodeHierarchy);

  //creating links
  let link = svg.selectAll('.node')
  .data(nodeHierarchy.descendants()
  .slice(1))
  .enter()
  .append('path')
  .attr('class', function(d) {
      let linkClass = 'link-inactive';
      if (searchTerms.length) {
        searchTerms.forEach(term => {
          if (d3Table[term]) {
            if (d3Table[term].includes(d.data.name) || term === d.data.name) {
              if (d.parent) {
                if (d3Table[term].includes(d.parent.data.name)) { linkClass = 'link-active'; }
              }
              else { linkClass = 'link-active' }
            }
          }
        })
      }
      return linkClass;
    })
  .attr('d', function(d) {
    return `M ${d.y} ${d.x}
    Q ${(d.parent.y)} ${(d.x + d.parent.x) / 2}
    ${d.parent.y} ${d.parent.x}`;
  })
  .attr('stroke-width', LINK_WEIGHT)

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

  nodeEnter.append('circle')
    .attr('r', NODE_RADIUS)
    .attr('class', function(d) {
      let nodeClass = 'node-inactive';
      if (searchTerms.length) {
        searchTerms.forEach(term => {
          if (d3Table[term]) {
            if (d3Table[term].includes(d.data.name) || term === d.data.name) {
              if (d.parent) {
                if (d3Table[term].includes(d.parent.data.name)) {
                  nodeClass = 'node-active';
                }
              }
              else {
                nodeClass = 'node-active'
              }
            }
          }
        })
      }
      return nodeClass;
    });

    nodeEnter.append('text')
        .text(function(d) {
          return d.data.name;
        })
        .attr('class', function(d) {
          let textClass = 'node-text-inactive';
          if (searchTerms.length) {
            searchTerms.forEach(term => {
              if (d3Table[term]) {
                if (d3Table[term].includes(d.data.name) || term === d.data.name) {
                  if (d.parent) {
                    if (d3Table[term].includes(d.parent.data.name)) { textClass = 'node-text-active'; }
                  }
                  else { textClass = 'node-text-active' }
                }
              }
            })
          }
          return textClass;
        })

    if (searchTerms) {
      let activeNodes = Array.from(document.querySelectorAll('svg .node-active'));

      activeNodes.forEach((el) => {
        el.addEventListener('click', toggleBranchVisibility);
      }) 
    }
}

function project(x, y, radiusMultiplier = 1) {
  var angle = (x - 90) / 180 * Math.PI, radius = y * radiusMultiplier;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function buildFancyTree(element, data, config, d3Table, searchTerms = false) {
          console.log('d3Table', d3Table)
  const { CHART_WIDTH, CHART_HEIGHT, DEPTH_SPACING_FACTOR, BREADTH_SPACING_FACTOR, NODE_RADIUS, LINK_WEIGHT } = config;
  removeHiddenClasses();
  let svg = select(element)
  .append('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT)
  .append('g')
  .attr('transform', `translate(${CHART_WIDTH / 2}, ${CHART_HEIGHT / 2})`);

  const ourTree = tree()
    .size([360, CHART_WIDTH / 2.3])
    .separation((a, b) => {
      return (a.parent === b.parent ? 2 : 3) / a.depth;
    });
  // passes hierarchiacal data into tree to create the root node

  const nodeHierarchy = hierarchy(data);

  ourTree(nodeHierarchy);


  //creating links

  let link = svg.selectAll('.node')
    .data(nodeHierarchy.descendants()
      .slice(1))
    .enter()
    .append('path')
    .attr('class', function(d) {
      let linkClass = 'link-inactive';
      if (searchTerms.length) {
        searchTerms.forEach(term => {
          if (d3Table[term]) {
            if (d3Table[term].includes(d.data.name) || term === d.data.name) {
              if (d.parent) {
                if (d3Table[term].includes(d.parent.data.name)) { linkClass = 'link-active'; }
              }
              else { linkClass = 'link-active' }
            }
          }
        })
      }
      return linkClass;
    })
    .style('stroke-width', LINK_WEIGHT)
    .attr("d", function(d) {
      let radiusMultiplier = d.children ? 0.5 : 1
        return "M" + project(d.x, d.y, radiusMultiplier)
            + "C" + project(d.x, (d.y + d.parent.y) / 2, radiusMultiplier)
            + " " + project(d.parent.x, (d.y + d.parent.y) / 2, radiusMultiplier)
            + " " + project(d.parent.x, d.parent.y, 0.5, radiusMultiplier);
    });

    // entering the nodes --> finally appending to DOM
    let nodeEnter = svg.selectAll('.node')
    .data(nodeHierarchy.descendants())
    .enter()
    .append('g')
    .attr('class', function(d) {
      return 'node' + (d.children ? 'node-internal' : 'node-leaf');
    })
    .attr('transform', function(d) {
      let radiusMultiplier = d.children ? 0.5 : 1
      return 'translate(' + project(d.x, d.y, radiusMultiplier) + ')';
    });

  nodeEnter.append('circle')
    .attr('r', NODE_RADIUS)
    .attr('class', function(d) {
      let nodeClass = 'node-inactive';
      if (searchTerms.length) {
        searchTerms.forEach(term => {
          if (d3Table[term]) {
            if (d3Table[term].includes(d.data.name) || term === d.data.name) {
              if (d.parent) {
                if (d3Table[term].includes(d.parent.data.name)) { nodeClass = 'node-active'; }
              }
              else { nodeClass = 'node-active' }
            }
          }
        })
      }
      return nodeClass;
    })



        // inactiveNodes.style.display === 'none' ? inactiveNodes.style.display = 'inherit' : inactiveNodes.style.display = 'inherit';
        // linksToToggle.style.display === 'none' ? linksToToggle.style.display = 'inherit' : linksToToggle.style.display = 'inherit';


  nodeEnter.append('text')
    .text(function(d) {
      return d.data.name;
    })
    .attr('class', function(d) {
      let textClass = 'node-text-inactive';
      // if (searchTerms.length) {
      //   searchTerms.forEach(term => {
      //     if (d3Table[term]) {
      //       if (d3Table[term].includes(d.data.name) || term === d.data.name) {
      //         if (d.parent) {
      //          if (d3Table[term].includes(d.parent.data.name)) { textClass = 'node-text-active'; }
      //         }
      //         else { textClass = 'node-text-active' }
      //       }
      //     }
      //   })
      // }
      return textClass;
    })

    // .attr("transform", function(d) {
    //   if (!d.children) return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
    //   return null;
    //   })
    // .style('fill', 'darkblue');
    
    if (searchTerms) {
      let activeNodes = Array.from(document.querySelectorAll('svg .node-active'));

      activeNodes.forEach((el) => {
        el.addEventListener('click', toggleBranchVisibility);
      }) 
    }
}

  function removeHiddenClasses() {
    let inactiveNodes = Array.from(document.querySelectorAll('svg .node-inactive'));
    let inactiveLinks = Array.from(document.querySelectorAll('svg .link-inactive'));
    let inactiveNodeText = Array.from(document.querySelectorAll('svg .node-text-inactive'));
    let activeNodes = Array.from(document.querySelectorAll('svg .node-active'));
    let activeLinks = Array.from(document.querySelectorAll('svg .link-active'));
    let activeNodeText = Array.from(document.querySelectorAll('svg .node-text-active'));
    if (inactiveNodes.length) inactiveNodes.forEach(node => node.classList.remove('node-hidden'));
    if (inactiveLinks.length) inactiveLinks.forEach(link => link.classList.remove('link-hidden'));
    if (inactiveNodeText.length) inactiveNodeText.forEach(text => text.classList.remove('node-text-hidden'));
    if (activeNodes.length) activeNodes.forEach(node => node.classList.remove('node-hidden'));
    if (activeLinks.length) activeLinks.forEach(link => link.classList.remove('link-hidden'));
    if (activeNodeText.length) activeNodeText.forEach(text => text.classList.remove('node-text-hidden'));
  }

  function toggleBranchVisibility(e) {
    e.preventDefault();
    let inactiveNodes = Array.from(document.querySelectorAll('svg .node-inactive'));
    let inactiveLinks = Array.from(document.querySelectorAll('svg .link-inactive'));
    let inactiveNodeText = Array.from(document.querySelectorAll('svg .node-text-inactive'));
    inactiveNodes.forEach(node => node.classList.toggle('node-hidden'));
    inactiveLinks.forEach(link => link.classList.toggle('link-hidden'));
    inactiveNodeText.forEach(text => text.classList.toggle('node-text-hidden'));
  }

module.exports = exports;
