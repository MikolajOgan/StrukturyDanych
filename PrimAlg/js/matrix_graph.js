class Graph_m {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjacencyMatrix = [];

        for (let i = 0; i < numVertices; i++) {
            this.adjacencyMatrix[i] = new Array(numVertices).fill(0);
        }
    }
}

Graph_m.prototype.addEdge = function (startVertex, endVertex, weight) {
    this.adjacencyMatrix[startVertex][endVertex] = weight;
    this.adjacencyMatrix[endVertex][startVertex] = weight;
}

Graph_m.prototype.getAdjacencyMatrix = function () {
    return this.adjacencyMatrix;
}

Graph_m.prototype.prim = function () {
    const numVertices = this.numVertices;
    const adjacencyMatrix = this.getAdjacencyMatrix();

    // Tworzenie tablicy, aby śledzić, czy wierzchołek został odwiedzony
    const visited = new Array(numVertices).fill(false);

    // Inicjalizacja listy drzewa spinającego
    const minimumSpanningTree = [];

    // Wybieramy pierwszy wierzchołek jako początkowy
    visited[0] = true;

    // Algorytm Prima
    while (minimumSpanningTree.length < numVertices - 1) {
        let minWeight = Infinity;
        let minStartVertex, minEndVertex;

        // Przeszukiwanie wszystkich wierzchołków
        for (let startVertex = 0; startVertex < numVertices; startVertex++) {
            if (visited[startVertex]) {
                // Sprawdzanie sąsiadów odwiedzonego wierzchołka
                for (let endVertex = 0; endVertex < numVertices; endVertex++) {
                    if (!visited[endVertex] && adjacencyMatrix[startVertex][endVertex] !== 0 && adjacencyMatrix[startVertex][endVertex] < minWeight) {
                        // Znaleziono mniejszą wagę dla nieodwiedzonego sąsiada
                        minWeight = adjacencyMatrix[startVertex][endVertex];
                        minStartVertex = startVertex;
                        minEndVertex = endVertex;
                    }
                }
            }
        }

        // Dodanie krawędzi o najmniejszej wadze do drzewa spinającego
        minimumSpanningTree.push([minStartVertex, minEndVertex]);
        visited[minEndVertex] = true;
    }

    return minimumSpanningTree;
}
