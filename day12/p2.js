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
        if (visited.has(from)) {
            newVisited = new Set([...visited, '2']);
        }
        else {
            newVisited = new Set([...visited, from]);
        }
    }

    let total = 0;
    for (let node of visitMap[from]) {
        if (node === 'start') continue;
        if (newVisited.has(node) && newVisited.has('2')) continue;

        total += travelPath(node, newVisited);
    }

    return total;
}

console.log(travelPath('start', new Set()))