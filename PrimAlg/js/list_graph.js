class Edge {
    constructor(vertex, weight) {
        this.vertex = vertex;
        this.weight = weight;
    }
}

class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
}

Graph.prototype.addVertex = function (vertex) {
    this.adjacencyList.set(vertex, []);
}

Graph.prototype.addEdge = function (vertex1, vertex2, weight) {
    this.adjacencyList.get(vertex1).push(new Edge(vertex2, weight));
    this.adjacencyList.get(vertex2).push(new Edge(vertex1, weight));
}

Graph.prototype.prim = function () {
    const visited = new Set();
    const minimumSpanningTree = new Graph();
    const startVertex = this.adjacencyList.keys().next().value;
    visited.add(startVertex);

    while (visited.size < this.adjacencyList.size) {
        let minimumEdge = null;

        for (const visitedVertex of visited) {
            const edges = this.adjacencyList.get(visitedVertex);
            for (const edge of edges) {
                if (!visited.has(edge.vertex)) {
                    if (minimumEdge === null || edge.weight < minimumEdge.weight) {
                        minimumEdge = {
                            from: visitedVertex,
                            to: edge.vertex,
                            weight: edge.weight
                        };
                    }
                }
            }
        }

        const {
            from,
            to,
            weight
        } = minimumEdge;
        minimumSpanningTree.addVertex(from);
        minimumSpanningTree.addVertex(to);
        minimumSpanningTree.addEdge(from, to, weight);
        visited.add(to);
    }

    return minimumSpanningTree;
}
