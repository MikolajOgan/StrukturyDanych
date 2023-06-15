function generateRandomGraph(numVertices, numEdges, weightRange) {
        const graph_m = new Graph_m(numVertices);
        const graph = new Graph();

    for (let i = 0; i < numVertices; i++) {
        graph.addVertex(i);
    }

    let edges = 0;
    while (edges < numEdges) {
        const vertex1 = getRandomInt(0, numVertices - 1);
        const vertex2 = getRandomInt(0, numVertices - 1);
        const weight = getRandomInt(weightRange[0], weightRange[1]);

        if (vertex1 !== vertex2 && !graph.adjacencyList.get(vertex1).some(edge => edge.vertex === vertex2)) {
            graph.addEdge(vertex1, vertex2, weight);
            graph_m.addEdge(vertex1, vertex2, weight);
            edges++;
        }
    }

    return {graph: graph, graph_m: graph_m};
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function printMinimumSpanningTree1(spanningTree, graph) {
    let result = "Minimum Tree:\n";
    let t_weight = 0;

    for (let i = 0; i < spanningTree.length; i++) {
        const [startVertex, endVertex] = spanningTree[i];
        const weight = graph.adjacencyMatrix[startVertex][endVertex];
        result += `${startVertex} --${weight}--> ${endVertex}\n`;
        t_weight += weight;
    }

    result += `Total weight:${t_weight}`;
    return result;
}

function displayMinimumSpanningTree(graph) {
    let result = ('Minimum Tree:\n');
    
    let t_weight = 0;
    
    graph.adjacencyList.forEach((edges, vertex) => {
        edges.forEach((edge) => {
            result += `${vertex} --${edge.weight}--> ${edge.vertex}\n`;
            t_weight += edge.weight;
        });
    });
    
    result += `Total weight:${t_weight}`;

    return result;
}