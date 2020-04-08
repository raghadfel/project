// CPCS 324 Algorithms & Data Structures 2

// Group (2): Jumana sami kattoa 1705674 
//            Raghad ayman felemban 1708252
//            Dania abdulaziz alogla 1708611
//            Wed mohammed alattas 1708476


// global variables 
// verteices 
var _v = [];
// edges 
var _e = []; 


function _main() 
{
   // create object graph 
   var g = new Graph();
   // set label
   g.label = 'Figure 3.10 (Levitin, 3rd edition)';

   // calling methods
   g.readGraph(_v, _e);
   g.printGraph();
   g.connectedComp = g.topoSearch(g.connectedComp);
   document.write("<p>dfs_push: ", g.dfs_push, "</p>");
   g.Counter++;
   document.write("<p> ", g.componentInfo(), "</p>");
   g.topoSearch(g.connectedComp);
   document.write("<p>bfs_order: ", g.bfs_order, "</p>");
   g.makeAdjMatrix();
   document.write("<p>first row matrix: ", g.adjMatrix[0], "</p>");
   document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");
}

/**
 * Create a graph vertex using a special input object, also called a configuration
 * object since it is used to configure the user properties of the vert.
 *
 * @author Group 2
 *
 * @constructor
 * @see {@link better_input} for details of config objects of the default internal input format.
 * @param {object} v Input (configuration) object containing info used to initialize the vertex (such as a label)
 * @param {string} v.label Required property (note how fields of input object are documented)
*/

function Vertex(v) {
   
   this.label = v.label;
   this.visit = false;  
   this.adjacent = new List();
   this.adjacentByID = adjacentByIdImpl;
   this.incidentEdges = incidentEdgesImpl;
   this.vertexInfo = vertexInfoImpl;
   this.insertAdjacent = insertAdjacentImpl;
}
// -----------------------------------------------------------------------
/**
   Create a graph edge object. Defaults to unweighted unless an optional weight
   argument is passed
   @author Group 2
   @constructor
   @param {integer} vert_i Target vertex id
   @param {number} [weight] Edge weight/cost, a number in general
*/
function Edge(vert_i, weight) {
   this.target_v = vert_i;
   if (weight == undefined) {
      this.weight = null; 
   } else {
      this.weight = weight;
   }
}
// -----------------------------------------------------------------------

/**
   Create an empty graph object. Defaults to unlabeled, undirected, and
   unweighted graph.
   @author Group 2
   @constructor
*/
function Graph() {
   // varaible 
   this.vert = [];
   this.nv = 0;  
   this.ne = 0;
   this.digraph = false;
   this.weighted = false;
   this.dfs_push = [];
   this.bfs_order = [];
   this.label = "";
   this.connectedComp = 0;
   this.adjMatrix = [];
   this.listVerts = "";

   //methods
   this.readGraph = better_input;
   this.addEdge = addEdgeImpl2;
   this.printGraph = printGraphImpl;
   this.makeGraph = makeGraphImpl;
   this.dfs = dfsImpl;
   this.bfs = bfsImpl;
   this.makeAdjMatrix = makeAdjMatrixImpl2;
   this.isConnected = isConnectedImpl;
   this.componentInfo = componentInfoImpl;
   this.topoSearch = topoSearchImpl;
   this.Counter = 1;
}
// -----------------------------------------------------------------------
/**
   Add an edge from a vertex pair (original pre Checkpoint 6).
   @author Group 2
   @deprecated Obsolete first implementation. Use {@link addEdgeImpl3} instead.
   @implements Graph#addEdge
   @param {number} u_i Source vertex id
   @param {number} v_i Target vertex id
*/
function addEdgeImpl(u_i, v_i) {
   var u = this.vert[u_i];
   var v = this.vert[v_i];
   // insert the target
   u.adjacent.insert(v_i);
   // check if direct or not
   if (!this.digraph) {
       v.adjacent.insert(u_i);
   }
}

// not used 
function addEdgeImpl2(u_i, v_i, weight) {
   var u = this.vert[u_i];
   var v = this.vert[v_i];
   // make new edge
   var v_edge = new Edge(v_i);
    // check if weighted
   if (!(weight === undefined)) {
       v_edge.weight = weight;
   }
   // insert the edge
   u.adjacent.insert(v_edge);
   // check if direct or not
   if (!this.digraph) {
       // make new edge
       var u_edge = new Edge(u_i);
       // check if weighted
       if (!(weight === undefined)) {
           u_edge.weight = weight;
       }
       // insert the edge
       v.adjacent.insert(u_edge);
   }


}

// not used
function addEdgeImpl3(u_i, v_i, weight)
{

}

/**
   Output graph properties and list its vertices (replaces {@link
      better_output}). This function depends on the vertex lister method of the
      graph.
      @author Group 2
      @implements Graph#printGraph
      @see {@link Graph#listVerts}
   */
function printGraphImpl() {

   //print 
   document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
   document.write("<p> ", this.componentInfo(), "</p>");

   //print each vertex info 
   for (var i = 0; i < this.nv; i++) {
      var v = this.vert[i];
      document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
   }
}


// not used
function listVertsImpl() {

}

/**
   Input graph data based on default internal format, see parameters for
   details. Create vertices and corresponding adjacency lists, and set number of
   vertices and edges accordingly. Set a weighted property of graph if an
   optional weight is specified in input edge list (based on the first pair).
   Vertices are auto assigned a numeric id starting from 0 based on position in
   the input vertex list. Will interpret input edge list as undirected unless
   the directed property of the graph was set. Only function allowed to break
   naming convention of method- implementing functions (no Impl suffix).
   @author Grpup 2
   @implements Graph#readGraph
   @param {object[]} v Vertex input (configuration) objects
   @param {string} v.label Vertex label
   @param {object} e Array of edge input (configuration) objects
   @param {integer} e.u Source vertex id
   @param {integer} e.v Target vertex id
   @param {number} [e.w] Edge weight
*/
function better_input(v, e) {

   // number of vertices and edges 
   this.nv = v.length;
   this.ne = e.length;
   // adding in vert array objects of Vertex (vert contain vertices of the graph)
   for (var i = 0; i < this.nv; i++) {
      this.vert[i] = new Vertex(v[i]);
   }
   // adding edges 
   for (var j = 0; j < this.ne; j++) {
      this.addEdge(e[j].u, e[j].v, e[j].w);
   }
 // check if edge is weighted
 for (let index = 0; index < this.ne; index++) {
   if (!(e[index].w == undefined)) {
      this.weighted = true;
      break;
   }
}
   // check if graph is undirceted 
   if (!this.digraph) {
      // double edges 
      this.ne = e.length * 2;
   }

  

}


// not used
function better_output() { 
}

/**
   Implement a versatile caller for search-like topological traversals of
   vertices (initially support DFS and BFS). Updates and returns the number of
   connected components {@link Graph#connectedComp}. Stores the id of vertices
   in visit order in {@link Graph#dfs_push} or {@link Graph#bfs_order} depending
   on requested search.
   @author Grpup 2
   @implements Graph#topoSearch
   @param fun Design left for students
   @return {integer} Number of connected components
*/
function topoSearchImpl(fun) {

   // make all vertices unvisited 
	for (var i = 0; i < this.nv; i++){
		this.vert[i].visit = false;
	}
   // stores the id of vertices in visit order depending on requested search
	for (var i = 0; i < this.nv; i++) {
		if (!this.vert[i].visit) {
         if(this.Counter == 1 ){
            fun++;
            this.dfs(i);
         } else {
            this.bfs(i);
         }
		}
   }
   
return fun;
}

/**
   Recursively traverse a connected component depth-first starting at passed
   vertex. Inserts visited vertex id in visit order in {@link #dfs_push}.
   @author Grpup 2
   @implements Graph#dfs
   @param {number} v_i Starting vertex id
*/
function dfsImpl(v_i) {
   
   v = this.vert[v_i];
   // mark it visted 
   v.visit = true;
   // push 
   this.dfs_push[this.dfs_push.length] = v_i;
   // new array of the adjacent vertices
   var adjIDArray = v.adjacentByID();
      //traverse vertices 
      for (var i = 0; i < adjIDArray.length; i++){
         if (!this.vert[adjIDArray[i]].visit){
            this.dfs(adjIDArray[i]);
         }
      }
}

/**
   Traverse a connected component breadth-first starting at passed vertex.
   Inserts visited vertex id in visit order in {@link #bfs_order}.
   @author Grpup 2
   @implements Graph#bfs
   @param {number} v_i Starting vertex id
*/
function bfsImpl(v_i) {
var v = this.vert[v_i];
// mark it visted 
v.visit = true;
//add 
this.bfs_order[this.bfs_order.length] = v_i;
// create queue object
var queue = new Queue();
// enqueue the vertex
queue.enqueue(v);
// check if the queue is empty
while (!queue.isEmpty()) {
    // dequeue the vertex
	var u = queue.dequeue();
   // new array of the adjacent vertices 
	var adjIDArray = u.adjacentByID();
	for (var i = 0; i < adjIDArray.length; i++){
      // if the vertex not visited 
		if (!this.vert[adjIDArray[i]].visit) {
         // visit the vertex
         this.vert[adjIDArray[i]].visit = true;
         // enqueue all the adjacent of the vertex
         queue.enqueue(this.vert[adjIDArray[i]]);
         // add it to the array
			this.bfs_order[this.bfs_order.length] = adjIDArray[i];
		}
	}
}





}
/**
   Generate adjacency matrix representation of graph - obsolete naïve
   implementation, see notes below.
   @author Group 2
   @deprecated Use {@link Graph#makeAdjMatrixImpl3} instead. This function
   doesn't support weighted edges, and is not coded optimally.
   @implements Graph#makeAdjMatrix
*/
function makeAdjMatrixImpl() {
   for (var i = 0; i < this.nv; i++) {
       // 2D array
       this.adjMatrix[i] = [];
       for (var j = 0; j < this.nv; j++) {
       // iniate all values of the matrix to zeros
           this.adjMatrix[i][j] = 0;
       }
       // add 1 for each adjacent vertex   
       var adjIDArray = this.vert[i].adjacentByID();
       for (var j = 0; j < adjIDArray.length; j++) {
           this.adjMatrix[i][adjIDArray[j]] = 1;
       }
   }
}

/**
   Generate adjacency matrix representation of graph - obsolete first weighted
   implementation, see notes below.
   @author Group 2
   @deprecated Use {@link Graph#makeAdjMatrixImpl3} instead. This version illustrates
   a point about better object-oriented design consistent with principles of
   encapsulation and proper hiding of implementation details.
   @implements Graph#makeAdjMatrix
*/
function makeAdjMatrixImpl2() {
   for (var i = 0; i < this.nv; i++) 
   {
      // Create 2D array
      this.adjMatrix[i] = [];
      for (var j = 0; j < this.nv; j++) 
      {
         // iniate all values of the matrix to zeros
         this.adjMatrix[i][j] = 0;
      }
      var v = this.vert[i];
      // new array with adjacent vertices
      var adjIDArray = v.adjacentByID();
      // adjacent edges (source , traget , weight )
      var EdgeArray = v.adjacent.traverse();
      for (var k = 0; k < adjIDArray.length; k++) 
      { 
         // check if it's weighted or not
         if (!this.weighted){  
            // if it isn't weighted assign weight to 1 
            this.adjMatrix[i][adjIDArray[k]] = 1;
         } else 
         {
            this.adjMatrix[i][adjIDArray[k]] = EdgeArray[k].weight;
         }
      }
   }

}

// not used
function makeAdjMatrixImpl3() { 
}


/**
   Return connected status based on internal connectivity field
   @author Group 2
   @implements Graph#isConnected
   @returns {boolean} True if graph is connected
*/
function isConnectedImpl() {
   return this.connectedComp == 1;
}


/**
   Report connectivity information if available
   @author Group 2
   @implements Graph#componentInfo
   @returns {string} Connectivity report including number of connected
   components if disconnected. One of following strings is returned: "no
   information available", "UNCONNECTED", or "CONNECTED n" where n is number of
   connected components
*/
function componentInfoImpl() {
   if (this.connectedComp == 0) 
	{
		return ("no connectivity info");
	} else if (this.connectedComp > 1) 
	{
		return ("DISCONNECTED " + this.connectedComp);
	} else if (this.isConnected) 
	{
		return ("CONNECTED");
	}


}

/**
   Get id of adjacent vertices in an array
   @author Group 2
   @implements {Vertex#adjacentById}
   @returns {integer[]} Array containing id of adjacent vertices in edge input order by default
*/
function adjacentByIdImpl() {
   //array
   var adjIDArray = [];
   //traverse all the adjacent of the selected vertex
   var adjEdge = this.adjacent.traverse();
      for (var i = 0; i < adjEdge.length; i++){
         // assign the target vertices for the selected vertex
         adjIDArray[i] = adjEdge[i].target_v;
      }
   return adjIDArray;
}

// not used
function incidentEdgesImpl() {

}

/**
   Get vertex details in a printable string
   @author Group 2
   @implements {Vertex#vertexInfo}
   @example <caption>Sample output.</caption>
   VERTEX: 0 {a} - VISIT: false - ADJACENCY: 3,2,4
   @returns {string} Formatted vertex information
*/
function vertexInfoImpl() {

return ("{" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID());
}

/**
   Insert a new edge node in the adjacency list of vertex. Currently only
   updates the internal adjacency list representation.
   @author Group 2
   @implements {Vertex#insertAdjacent}
   @param {number} v_i Edge target vertex id
   @param {number} [weight] Edge weight (for weighted graphs), if specified
*/
function insertAdjacentImpl(v_i, weight){
   // create edge 
   var edge = new Edge(v_i, weight);
   // add the adjacent edge to the adjacent link list of the source 
   this.adjacent.insert(edge);
}

// not used
function makeGraphImpl() {

}