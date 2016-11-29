//http://bl.ocks.org/mbostock/4339083 -- collapsable//
'use strict'
/*IMPORTING THE D3 library */
// import {hierarchy, tree, select, path} from "d3";
// import {hierarchy, tree} from "d3-hierarchy";
// import {select} from "d3-selection";
// import {path} from "d3-path";

// var d3 = Object.assign({}, require("d3-hierarchy"), require("d3-selection"), require("d3-path"));

/* ACTUAL DATA FOR NOW (IN JSON) */
	/* For final version, the data needs to be imported here and then a function should JSON.stringify each one */
var treeDataAnswerActions = [{"name":"addTodo","type":"ADD_TODO"},{"name":"setVisibilityFilter","type":"SET_VISIBILITY_FILTER"},{"name":"toggleTodo","type":"TOGGLE_TODO"},{"name":"undoAction","type":"UNDO"},{"name":"redoAction","type":"REDO"}]
var treeDataAnswerUI = [{"name":"TestTodoList","propNames":["todos","onTodoClick"]}]
var treeDataAnswerReducers = [{"name":"visibilityFilter","cases":["SET_VISIBILITY_FILTER"]},{"name":"todos","cases":["ADD_TODO","TOGGLE_TODO"]}]

////--- D3 LOGIC -----////

// constants
var margin = [20, 120, 20, 120];
var width = 1480 - margin[1] - margin[3];
var height = 800 - margin[0] - margin[2];
var index = 0;
var rectW = 200;
var rectH = 100;

//function that creates the tree: //takes in DOM element the graph && data that the tree visualizes
function create(element, data) {
	//STEP 1 in computing a hierarchal layout is creating a ROOT NODE.
	//specifies the tree's layout size to the [width, height] & returns the tree's layout (otherwise defaults to [1,1])
	var tree = d3.tree.size([width, height]);
//Select is selecting the DOM element and returning it w/ the added attributes we are adding to it. It is also appending an SVG element. PLUS it is apeending an svg:g element.
		//the <g> SVG element is a container used to group other SVG elements. Every thing w/ the <g> tag will move together.
	 var svg = d3.select(element)
		 .append("svg")
		 .attr("width", width)
		 .attr("height", height)
		 .append("svg:g")
//the attribute "transform" is an SVG transform.
//Translate moves the object to a different position relative to other objects.
//Here, we are moving 0 to the right and 40 to the left
		 .attr("transform", "translate(0, 40)");
//Computes the new tree layout --- formating data w/hierarchy module.
//The root node created by hierarchy(data) is passed into our tree.
	var nodes = tree(hierarchy(data));
//Iterate thru the data w/ d3's each, which will set the y coordinates of each node
	nodes.each(d => {
	 d.y = d.depth * height / 3;
 	});


//selectAll - is instructing d3 that 'g.node' should correspond to the data(which in this case is our tree- nodes)
// assign all the g elements that have 'node' class w/ an ID. Takes in the Root node.
	var node = svg.selectAll("g.node").data(nodes, d => {
		return d.id || (d.id = ++i);
	});

	//Enters any new nodes at the parent's previous positions ( appends nodes to DOM)
	var nodeEnter = node.enter().append('g').attr("class", "node");
	//'rect' is an svg element & it has attributes assigned w/ the d# attr. method
	//d3's "transform" attribute, properly positions the nodes

	/*WITH RECTANGLES */
	nodeEnter.append("rect")
	 .attr("width", rectW)
	 .attr("height", rectH)
	 .attr("y", -10)
	 .attr("rx", 2)
	 .attr("ry", 2)
	 .attr("stroke", "black")
	 // .attr("stroke-width", 0.9)
	 .attr("transform", d => `translate(${d.x},${d.y})`)
	 .style("fill","blue");

	// /*WITH CIRCLES */
	// 	nodeEnter.append("circle")
	// 	 .attr("cx", 40)
	// 	 .attr("cy", 50)
	// 	 .attr("r", 20)

	nodeEnter.append("text")
	 .attr("x", 4)
	 .attr("y", 10)
	 .attr("dy", ".5em")
	 .text(d => d.name)

 	//here, we are inserting 'svg paths' from the 'g' on the DOM.
 	//An SVG path is the outline of a shape (the path between 2 points) which can be either a straight line or a curve. If it is a curve, the curve can be an arc, a cubic Bezier curve, or a quad. bezier curve. The cubic bezier curve (seen below) takes 4 points (start,end, and 2 curve points)
 			// The shape of the SVG path element is defined by the attribute 'd'. 'd' has a series of commands and parametersthat are followed sequentially.
 			//by using selectAll, we are grabbing every svg's path.link. Using .data, we are taking all of the links of the path and returning the link.
	svg.selectAll("path.link")
	 .data(links, d => { return d.target.id; })
	 .enter().insert("svg:path", "g")
	 .attr("class", "link")
	 .attr("d", nodez => {
			 var oldX = nodez.source.x;
			 var oldY = nodez.source.y;
			 var newX = nodez.target.x;
			 var newY = nodez.target.y;
		 // constructs a new path serializer
		 var path = path();
		 //moves to the specified point (x,y), but no line is drawn
		 path.moveTo(oldX + rectW / 2, oldY);
		 //Draws the cubic Bezier segment from the current point of the (x,y) with the following specified control points
		 path.bezierCurveTo(oldX + rectW / 2, //x1
		 										(oldY + newY) / 2, //y1
		 										newX + rectW / 2, //x2
		 										(oldY + newY) / 2, //y2
		 										newX + rectW / 2, //x
		 										newY);//y
		 return path;
	 	});


}//end of create

// calling CREATE
 create("body", treeDataAnswerActions);
