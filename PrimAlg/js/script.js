const numVertices = 10;
const numEdges = 30;
const weightRange = [1, 10];
let tree;

const graph = generateRandomGraph(numVertices, numEdges, weightRange);

const start = performance.now();

tree = graph.graph.prim();

const end = performance.now();

console.log(displayMinimumSpanningTree(tree));

console.log(`Czas algorytmu (lista sąsiedztwa): ${end - start}ms. Wierzchołki: ${numVertices}. Krawędzie ${numEdges}`);

const start1 = performance.now();

tree = graph.graph_m.prim();

const end1 = performance.now();

console.log(printMinimumSpanningTree1(tree, graph.graph_m));

console.log(`Czas algorytmu (macierz sąsiedztwa): ${end1 - start1}ms. Wierzchołki: ${numVertices}. Krawędzie ${numEdges}`);
