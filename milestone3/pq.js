// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2019, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)

// initial requirements: to quickly support Dijkstra and second Prim's algorithms, 
// implement minimum priority functionality

// design decisions:
// Reuse the 324 linked list implementation
// how will the PQ ops be implemented?
// <student fill here>

// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)

// Impact analysis:
// <student fill here>



// -----------------------------------------------------------------------
// Priority queue object constructor (document using JSDOC comments)

function PQueue()
{
	this.pq = new List();          // requirement: linked-list implementation

	
	// specify (design) methods
	
	this.isEmpty =  isEmptyImpl;                   // return true if queue empty
	this.deleteMin = deleteMinImpl ;                // remove/return item with minimum priority
	this.insert = insertImpl;                   // insert/update an item with priority
	
}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)

function PQNode(item, key)
{
	this.item = item;
	this.prior = key;
	
	// specify (design) methods
	
}

// -----------------------------------------------------------------------
// functions used by PQueue() object methods
// specify interface information (JSDOC comments)
// function names should not clash with linklist.js and queue.js
// ....

function isEmptyImpl(){
    
	return (this.pq.isEmpty());
	
}


// delete and return the item with minimum priority 
function deleteMinImpl(){

       var pointer = this.pq.first;   
       var minimum = this.pq.first;
       var previous = null ;
       while(pointer != null){
         if((pointer.next != null) && (pointer.next.item.prior < minimum.item.prior)){
           minimum = pointer.next ;
           previous = pointer ;
         }
         pointer = pointer.next;
       }
       if(minimum == this.pq.first){   
          return this.pq.deleteFirst().item;
       }
       else{ 
          previous.next = minimum.next;   
          return minimum.item.item;
       }
}

/**
   Insert a new item into the priority queue
   or update an item with new priority if the new key 
   smaller than the current key.

   @author Group(2)

*/

// insert new item in priority queue 
function insertImpl(item, key){
    
    var item = new PQNode(item,key);
    var pointer = this.pq.first;
    var toInsert = true;
    if (this.isEmpty()) {
        this.pq.insert(item);
        toInsert = false;
    } else { 
        while (pointer != null) { 
            if (item.item == pointer.item.item) { 
                pointer.item.prior = key;
                toInsert = false;
                break; 
            }
            pointer = pointer.next;
        }
    }
    if (toInsert) {     
        this.pq.insert(item);
    }
    
}