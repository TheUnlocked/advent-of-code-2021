import load from '../util/load.js';
export default undefined;

const content = load(12).lines;

const edges = content.map(x => x.split('-'));

const visitMap = {};

for (const [a, b] of edges) {
    if (!(a in visitMap)) visitMap[a] = new Set();
    if (!(b in visitMap)) visitMap[b] = new Set();

    visitMap[a].add(b);
    visitMap[b].add(a);
}

function isSmallCave(name) {
    return name === name.toLowerCase();
}

function travelPath(from, visited) {
    if (from === 'end') {
        return 1;
    }

    let newVisited = visited;
    if (isSmallCave(from)) {
        newVisited = new Set([...visited, from]);
    }

    let total = 0;
    for (let node of visitMap[from]) {
        if (visited.has(node)) continue;

        total += travelPath(node, newVisited);
    }

    return total;
}

console.log(travelPath('start', new Set()))