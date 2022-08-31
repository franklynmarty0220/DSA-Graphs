class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let v of vertexArray) {
      this.addVertex(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let n of this.nodes) {
      if(n.adjacent.has(vertex)) {
        n.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {

    const checked = new Set();
    const result = [];
    
    function traverse(vertex){

      if(!vertex){
        return null;
      }

      checked.add(vertex);
      result.push(vertex.val);

      vertex.adjacent.forEach(n => {
        if(!checked.has(n)){
          return traverse(n);
        }
      });
    }
    
    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set();
    const result = [];
    let currVertex;

    seen.add(start)

  while (toVisitQueue.length) {
    currVertex = toVisitQueue.shift();
    result.push(currVertex.val);

    currVertex.adjacent.forEach(neighbor =>{
      if(!seen.has(neighbor)){
        seen.add(neighbor);
        toVisitQueue.push(neighbor);
      }
    })
  }

  return result;
  }
}

module.exports = {Graph, Node}