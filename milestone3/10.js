// CPCS 324 Algorithms & Data Structures 2

// Group (2): Jumana sami kattoa 1705674 
//            Raghad ayman felemban 1708252
//            Dania abdulaziz alogla 1708611
//            Wed mohammed alattas 1708476

// global varibales
var _v = [], _e = [];

function _main() {

    // create object graph
    var g = new Graph();


    // set label
    g.label = 'Exercise 9.2: 1b (Levitin, 3rd edition)';


    // calling methods
    g.readGraph(_v, _e);
    g.makeAdjMatrix();
    g.printGraph();
    g.connectedComp = g.topoSearch(g.connectedComp);
    document.write("<p>dfs_push: ", g.dfs_push, "</p>");
    g.Counter++;
    document.write("<p> ", g.componentInfo(), "</p>");
    g.topoSearch(g.connectedComp);
    document.write("<p>bfs_order: ", g.bfs_order, "</p>");
    document.write('<br>Transitive closure<br>');
    g.WarshallFloyd();


    // check if it is direct or undirect
    if (g.adjMatrix[0][0].transC_direct === undefined) {
        document.write("undefined, Only for dicret graph<br>");
    }
    else {
        for (var i = 0; i < g.nv; i++) {
            for (var j = 0; j < g.nv; j++) {
                document.write(g.adjMatrix[i][j].transC_direct, ',');
            }
            document.write('<br>');
        }
    }

    // print distance matrix using floyd
    document.write('<br>Distance matrix <br>');
    // call method
    g.WarshallFloyd();
    // check if it weighted or not
    if (g.adjMatrix[0][0].distance_weight === undefined) {
        document.write("undefined, Only for weighted graph<br>");
    }
    else {
        for (var i = 0; i < g.nv; i++) {
            for (var j = 0; j < g.nv; j++) {
                document.write(g.adjMatrix[i][j].distance_weight, ',');
            }
            document.write('<br>');
        }
    }

    //print minumam spanning tree using prim2 algorithm
    document.write('<br>MST by Prim2 (linear PQ)<br>');
    // call method
    g.Prim();
    if (g.weighted) {
        printTree(g.VT);
    }
    else {
        document.write('undefined, for weighted graph only<br>');
    }

    // print minumam spanning tree using dijkstra algorithm
    document.write('<br>Shortest paths by Dijkstra from vertex 0<br>');
    // call method
    g.Dijkstra(0);
    // distance matrix
    var disMat_dij = [];
    if (g.weighted) {
        // print minimum spanning tree
        printTree(g.VT);
        //print distenace matrix
        document.write('<br>Distance matrix from Dijkstra<br>');
        for (i = 0; i < g.nv; i++) {
            //apply dijkstra algorithm to each vertix to create the matrix 
            g.Dijkstra(i);
            disMat_dij[i] = [];
            // fill the row with distance to all vertices
            for (j = 0; j < g.nv; j++) {
                disMat_dij[i][g.VT[j].tree] = g.VT[j].distance;
            }
            // print row 
            document.write(disMat_dij[i], '<br>');
        }

    }
    else {
        document.write('undefined, for weighted graph only<br>');
    }


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


//------------------------------------------------------------------------

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

//------------------------------------------------------------------------

/**
   Create an empty graph object. Defaults to unlabeled, undirected, and
   unweighted graph.
   @author Group 2
   @constructor
*/
function Graph() {

    //varibales
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
    this.VT = [];

    //methods
    this.listVerts = listVertsImpl;
    this.readGraph = better_input;
    this.addEdge = addEdgeImpl3;
    this.printGraph = printGraphImpl;
    this.makeGraph = makeGraphImpl;
    this.dfs = dfsImpl;
    this.bfs = bfsImpl;
    this.makeAdjMatrix = makeAdjMatrixImpl3;
    this.isConnected = isConnectedImpl;
    this.componentInfo = componentInfoImpl;
    this.topoSearch = topoSearchImpl;

    // variables 
    this.Counter = 1;
    this.TcMatrix = [];
    this.Warshall = [];
    this.Floyd = [];
    this.Prim_Edge = [];

    //methods
    this.hasPath = hasPathImpl;
    this.shortestPath = shortestPathImpl;
    this.isDAG = isDAGImpl;
    this.WarshallFloyd = WarshallFloydImpl;
    this.DfsTC = DfsTCImpl;
    this.Prim = PrimImpl2;
    this.Dijkstra = DijkstraImpl;


}


/**
   Print the minimum spanning tree
   @author Group 2
   @implements Graph#printTree
   @param {number} VT tree array
*/
function printTree(VT) {
    for (i = 0; i < VT.length - 1; i++) {
        document.write((VT[i].distance === undefined ? '' : VT[i].distance), '(', VT[i].parent, ',', VT[i].tree, '),');
    }
    document.write((VT[VT.length - 1].distance === undefined ? '' : VT[VT.length - 1].distance), '(', VT[VT.length - 1].parent, ',', VT[VT.length - 1].tree, ').<br>');
}

/**
   Clculate minimum spanning tree using Dijkstra algorithm
   @author Group 2
   @implements Graph#DijkstraImpl(s)
   @param {number} s start vertex
*/
function DijkstraImpl(s) {

    // Chech if the graph is weighted or not
    if (this.weighted) {
        // Create pq
        var pq = new PQueue();
        // Create penultimate and distances arrays
        var penultimate = [];
        var distances = [];

        // Initialize the queue with initial values
        for (var i = 0; i < this.nv; i++) {
            distances[i] = Infinity;     
            penultimate[i] = "-";          
            pq.insert(i, distances[i]);
            this.vert[i].visit = false;
        }


        // Initilaize the queue with the first vertex and its ditance
        distances[s] = 0;
        pq.insert(s, distances[s]);
        // take next vertex
        for (var i = 0; i < this.nv; i++) {
            // take delete the vertix with the minimum distance 
            u = pq.deleteMin();
            // mark it visted
            this.vert[u].visit = true;
            // add the deleted vertex to minimum spanning tree with it's penultimate and distance
            this.VT[i] = {
                tree: u,                 
                parent: penultimate[u],     
                distance: distances[u]      
            }

           // return the adjacent edge infromation (target , weight)
            var info_edge = this.vert[u].incidentEdges();
            for (var j = 0; j < info_edge.length; j++) {
                // take adjacent vertex with it's weight
                var id = info_edge[j].adjacent_target;
                var weight = info_edge[j].edge_w;

                //if there's a shorter path to a vertex, consider that path (update the queue, distances, and penultimate arrays)
                //check if there is shorter path in distance array 
                if (distances[u] + weight < distances[id] && !this.vert[id].visit) {
                    // update the information of the vertex
                    distances[id] = distances[u] + weight;
                    penultimate[id] = u;
                    pq.insert(id, distances[id]);
                }

            }
        }
    }
}

/**
   Clculate minimum spanning tree using Prim2 algorithm
   @author Group 2
   @implements Graph#PrimImpl2(s)
*/
function PrimImpl2() {
    // check if it weighted
    if (this.weighted) {
        //create object pq
        var pq = new PQueue();
        // create penultimate , weight , VT array
        var penultimate = [];
        var weight = [];
        this.VT = [];
        var u;


        for (var j = 0; j < this.nv; j++) {
            // initilize the arrays 
            this.vert[j].visit = false;
            penultimate[j] = "-";
            weight[j] = Infinity;

        }



        // return the adjacent edge infromation (target , weight)
        var info_edge = this.vert[0].incidentEdges();
        // for loop with the adjacent vertices
        for (var i = 0; i < info_edge.length; i++) {
            //insert the target and the weight to the queue
            pq.insert(info_edge[i].adjacent_target, info_edge[i].edge_w);
            // change the traget to zeros 
            penultimate[info_edge[i].adjacent_target] = 0;
            //change the target to weight
            weight[info_edge[i].adjacent_target] = info_edge[i].edge_w;

        }

        // make it visited
        this.vert[0].visit = true;
        // initilize the tree with 0 and the parent with penultimate[0]
        this.VT[0] = {
            //vertex
            tree: 0,
            //penultimate of this vertex
            parent: penultimate[0]
        }



        //find a way to the rest n-1 vertices
        for (var i = 1; i < this.nv; i++) {
            //take and delete minimum weight edge
            u = pq.deleteMin();
            //mark as visited
            this.vert[u].visit = true;
            //add vertex that delete from qeueue into vt
            this.VT[i] = {
                tree: u,
                parent: penultimate[u]
            }


            // return the adjacent edge infromation (target , weight)
            info_edge = this.vert[u].incidentEdges();
            for (var j = 0; j < info_edge.length; j++) {


                // check if it visited and the weight is the min
                if (!this.vert[info_edge[j].adjacent_target].visit && info_edge[j].edge_w < weight[info_edge[j].adjacent_target]) {
                    // insert the target and the weight
                    pq.insert(info_edge[j].adjacent_target, info_edge[j].edge_w);
                    // insert the parent
                    penultimate[info_edge[j].adjacent_target] = u;
                    // insert the weight of the edge
                    weight[info_edge[j].adjacent_target] = info_edge[j].edge_w;

                }


            }

        }

    }

}

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

/**
   Add an edge from a vertex pair and optional weight (from Checkpoint 6).
   @author Group 2
   @deprecated Obsolete, use {@link addEdgeImpl3} instead. It is tempting to
   insert directly via .insert() method of underlying linked-list, which is
   considered an encapsulation mistake. Graph and its methods should not see how
   adjacency lists are implemented.
   
   @implements Graph#addEdge
   @see addEdgeImpl3
   @see Vertex#insertAdjacent
   @param {integer} u_i Source vertex id
   @param {integer} v_i Target vertex id
   @param {number} [weight] Edge weight/cost
*/
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

/**
   Add an edge from a vertex pair and an optional weight. A better implementation
   which relies on a vertex method to handle adjacency details.
   @author Group 2
   @implements Graph#addEdge
   @see Vertex#insertAdjacent
   @param {integer} u_i Source vertex id
   @param {integer} v_i Target vertex id
   @param {number} [weight] Edge weight/cost
*/
function addEdgeImpl3(u_i, v_i, weight) {
    // create source vertex 
    var u = this.vert[u_i];
    // create target vertex
    var v = this.vert[v_i];
    // connect the u to it's v with the weight 
    u.insertAdjacent(v_i, weight);
    //check if the graph is directed or not
    if (!this.digraph) {
        // use v as source and connect it to it's target(u)
        v.insertAdjacent(u_i, weight);
    }


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
    // print
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
    // print connectivity status 
    document.write(this.componentInfo());
    // list vertices
    this.listVerts();
    // print
    document.write('<br>');

}

/**
   Output a vertex list using descriptive strings returned by the Vertex object 
   @author Grpup 2
      
   @implements Graph#listVerts
   @see Vertex#vertexInfo
*/
function listVertsImpl() {
    //print each vertex info 
    for (var i = 0; i < this.nv; i++) {
        var v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo());
    }
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

/**
   Output graph data
   @author Grpup 2
   @deprecated Replaced by {@link printGraphImpl}
   @implements Graph#printGraph
   @see {@link printGraphImpl}
*/
function better_output() {

    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
    // check if there is connctivity
    switch (this.connectedComp) {
        case 0: document.write('<br> no connectivity info <br><br>');
        case 1: document.write('<br> CONNECTED <br><br>');
        default: document.write('<br> DISCONNECTED: '.concat(this.connectedComp, '<br>'));
    }
    // list vertices
    this.listVerts();


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
    for (var i = 0; i < this.nv; i++) {
        this.vert[i].visit = false;
    }
    // stores the id of vertices in visit order depending on requested search
    for (var i = 0; i < this.nv; i++) {
        if (!this.vert[i].visit) {
            if (this.Counter == 1) {
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

    _v = this.vert[v_i];
    // mark it visted 
    _v.visit = true;
    // push 
    this.dfs_push[this.dfs_push.length] = v_i;
    // new array of the adjacent vertices
    var adjIDArray = _v.adjacentByID();
    //traverse vertices 
    for (var i = 0; i < adjIDArray.length; i++) {
        if (!this.vert[adjIDArray[i]].visit) {
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
        for (var i = 0; i < adjIDArray.length; i++) {
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

/**
   Generate an adjacency matrix from internal adjacency lists. A weight (or
   weighted adjacency) matrix is produced if graph is weighted. This is a better
   implementation which relies on vertex methods to obtain incident edges
   information.
   @author Group 2
   @implements Graph#makeAdjMatrix
*/
function makeAdjMatrixImpl3() {
    for (var i = 0; i < this.nv; i++) {
        // Create 2D array
        this.adjMatrix[i] = [];
        for (var j = 0; j < this.nv; j++) {
            // iniate all values of the matrix to zeros
            this.adjMatrix[i][j] = 0;
        }
        // edges information (weight , target)
        var info_edge = this.vert[i].incidentEdges();
        for (var j = 0; j < info_edge.length; j++) {
            var edge_node = info_edge[j];
            this.adjMatrix[i][edge_node.adjacent_target] = this.weighted ? edge_node.edge_w : 1;
        }
    }
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

/**
   @typedef {object} enode - Workaround to document a literal object returned by function
   @property  {integer} adjVert_i - id of target vertex
   @property  {string} edgeLabel - a text label (not implemented, always "" for now)
   @property  {number} [edgeWeight] - weight/cost, if any
   @see incidentEdgesImpl
*/
// a @typedef as work-around to specify fields of a return object, otherwise
// multiple @returns show fields as separate values with different types;
// this is a weakness in the package (@returns should work similar to @param
// for object properties, but it does not as of v3.6.3)
/**
   Get information of edges incident to a vertex, to be returned in an array of
   special output objects each of which contains information from an edge node
   in the vertex adjacency list. This function implements a general, extensible
   interface to the adjacency lists which may replace {@link
    Vertex#adjacentByID}.
    @author Group 2
    @author Sandy Bridge
    @implements {Vertex#incidentEdges}
    @returns {enode[]} Array of custom objects containing edge information, in
    input order by default.
 */
 
function incidentEdgesImpl() {
    // array of edge information
    var info_edge = [];
    // traverse the adjacent vertices
    var adjEdge_WT = this.adjacent.traverse();
    for (var i = 0; i < adjEdge_WT.length; i++) {
        info_edge[i] = {
            // target
            adjacent_target: adjEdge_WT[i].target_v,
            // label
            edgeLabel: "",
            //weight
            edge_w: adjEdge_WT[i].weight
        };
    }
    return info_edge;



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
    var info = "".concat(" {", this.label, "} - VISIT: ", this.visit, " - ADJACENCY: ", this.adjacentByID(), "<br>");
    return info;

}

/**
   Insert a new edge node in the adjacency list of vertex. Currently only
   updates the internal adjacency list representation.
   @author Group 2
   @implements {Vertex#insertAdjacent}
   @param {number} v_i Edge target vertex id
   @param {number} [weight] Edge weight (for weighted graphs), if specified
*/
function insertAdjacentImpl(v_i, weight) {
    // create edge 
    var edge = new Edge(v_i, weight);
    // add the adjacent edge to the adjacent link list of the source 
    this.adjacent.insert(edge);
}

// not used
function makeGraphImpl() {
}



/**
* @description this method find the direct and undirect edge between vertices 
* @method DfsTC
* @author Group 2
* @returns DfsTC matrix 
*/

function DfsTCImpl() {
    // array of vertices 
    for (var i = 0; i < this.nv; i++) {
        var v = this.vert[i];
        for (var j = 0; j < this.nv; j++) {
            // make it all unvisited
            this.vert[j].visit = false;
        }
        // transitive closure 2D Matrix
        this.TcMatrix[i] = [];
        for (var j = 0; j < this.nv; j++) {
            // inilize all with zeros
            this.TcMatrix[i][j] = 0;
        }
        // new array of the adjacent vertices 
        var adjIDArray = v.adjacentByID();
        for (var k = 0; k < adjIDArray.length; k++) {
            // call dfs method
            this.dfs(adjIDArray[k]);
        }

        for (var l = 0; l < this.nv; l++) {
            // check if visited
            if (this.vert[l].visit) {
                // assign 1 that is reachable by the vertex
                this.TcMatrix[i][l] = 1;
            }
        }
    }

}
/**
* @method WarshallFloyd
* @author Group 2
* @returns {object[] , object[] } warshall matrix and floyd matrix 
*/
function WarshallFloydImpl() {
    // call adjacent matrix
    this.makeAdjMatrix();
    // fill the floyd and warshall matrix with the adjacency matrix 
    floyd = [];
    warshall = [];
    for (var i = 0; i < this.nv; i++) {
        floyd[i] = this.adjMatrix[i].slice();
        warshall[i] = this.adjMatrix[i].slice();

        // chnage the 0 values in floyd matrix  to infinity 
        for (var j = 0; j < this.nv; j++) {
            if (this.adjMatrix[i][j] == 0 && (i != j)) {
                floyd[i][j] = Infinity;
            }
        }
    }

    for (var k = 0; k < this.nv; k++) {
        for (var i = 0; i < this.nv; i++) {
            for (var j = 0; j < this.nv; j++) {
                // choose 1 or 0 based on the check
                warshall[i][j] = (warshall[i][j] || (warshall[i][k] && warshall[k][j])) ? 1 : 0;
                //choose the shortest path
                floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j]);
                this.adjMatrix[i][j] = {
                    transC_direct: this.digraph ? warshall[i][j] : undefined, // check if it direct or not 
                    distance_weight: this.weighted ? floyd[i][j] : undefined  // check if is has weight or not
                }
            }
        }

    }

}
/**
* 
* @method hasPathImpl
* @param {integer} v_i source vertex id
* @param {integer} v_j target vertex is 
* @author Group 2
* @returns {boolean} return true if there is path between v_i and v_j otherways return false 
*/
function hasPathImpl(u_i, v_i) {
    // check if direct or not
    if (this.adjMatrix[u_i][v_i].transC_direct === undefined) {
        return "<br>undefined, Only for direct graph<br>";
    }
    return (this.adjMatrix[u_i][v_i].transC_direct == 1 ? true : false);
}

/**
* @method shortestPathImpl
* @param {integer} v_i  source vertex id 
* @param {integer} v_j  target vertex is 
* @author Group 2
* @returns {edge} shorter path between two vertsic
*/
function shortestPathImpl(v_i, v_j, v_k) {
    //choose the min
    return (Math.min(this.Floyd[v_i][v_j], (this.Floyd[v_i][v_k] + this.Floyd[v_k][v_j])));
}

/**
* 
* @method isDAG 
* @author Group 2
* @returns {boolean} value if direct acycle graph or not 
*/
function isDAGImpl() {
    if (this.adjMatrix[0][0].transC_direct === undefined) {
        return "<br>undefined, Only for direct graph<br>";
    }
    for (var i = 0; i < this.nv; i++) {
        if (this.hasPath(i, i)) {
            return false;
        }
    }
    return true;
}
/**
* @methodOf Graph#
* @method primImpl 
* @author Group 2
* @param {type} No parameter 
* @description Perform the second implementation of Prim’s algorithm for constructing 
a Minimum spanning tree for A weighted connected graph.
*/
function PrimImpl() {
	// array of vertices
	var Vertices = [];
	for (var m = 0; m < this.nv; m++) {
      // mark it as unvisit
		this.vert[m].visit = false;
   }
   // assign start vertex
   Vertices[0] = this.vert[0];
   // mark as visited
   this.vert[0].visit = true;
   // inilize with infinity
	var min = Infinity; 
	for (var i = 0; i < this.nv; i++) {

		for (var j = 0; j < Vertices.length; j++) {
         // return the adjacent edge infromation (target , weight)
			var info_edge = Vertices[j].incidentEdges();
			for (var k = 0; k < info_edge.length; k++) {
             // check if it is not visited and the weight less than the min
				if (!this.vert[info_edge[k].adjacent_target].visit && info_edge[k].edge_w < min) {
					this.Prim_Edge[i] =
						({
                     // vertex
                     SourceV: Vertices[j],
                     //target vertex
                     TargetU: this.vert[info_edge[k].adjacent_target],
                     //weight 
							weight: info_edge[k].edge_w
                  });
               // update the min weight
					min = this.Prim_Edge[i].weight;

				}
			}
      } 
      // Asign target vertex and make it visited
		Vertices[Vertices.length] = this.Prim_Edge[this.Prim_Edge.length - 1].TargetU;
		this.Prim_Edge[this.Prim_Edge.length - 1].TargetU.visit = true;
		min = Infinity;
	}
}