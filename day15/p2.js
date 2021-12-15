import PriorityQueue from 'priorityqueuejs';
import load from '../util/load.js';
export default undefined;

const content = load(15).grid.map(x => x.map(x => +x));

const cWidth = content.length;
const cHeight = content[0].length;

const factor = 5;
const map = new Array(cWidth * factor).fill(0).map((_, x) => new Array(cHeight * factor).fill(0).map((_, y) => {
    let val = content[x % cWidth][y % cHeight] + Math.floor(x / cWidth) + Math.floor(y / cHeight);
    while (val > 9) {
        val -= 9;
    }
    return val;
}));

const queue = new PriorityQueue((a, b) => b.risk - a.risk);

const width = map.length;
const height = map[0].length;

queue.enq({ x: 0, y: 0, risk: 0 });

const visited = new Map();

function neighbors(x, y) {
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
    ].filter(([x, y]) => {
        if (x < 0 || x >= width) return false;
        if (y < 0 || y >= height) return false;
        return true;
    });
}

function hash(x, y) {
    return `${x},${y}`;
}

function riskOfHash(h) {
    const [x, y] = h.split(',');
    return map[x][y];
}

function riskOf(x, y) {
    return visited.get(hash(x, y))
}

const fromMap = {};

while (queue.size() > 0) {
    const { x, y, risk } = queue.deq();

    if (visited.has(hash(x, y)) && !(risk < visited.get(hash(x, y)))) continue;
    visited.set(hash(x, y), risk);

    if (x === width - 1 && y === height - 1) {
        console.log(riskOf(x, y));
        process.exit();
    }

    for (const [nX, nY] of neighbors(x, y).filter(([nX, nY]) => {
        if (!visited.has(hash(nX, nY))) return true;
        if (riskOf(x, y) + map[nX][nY] < riskOf(nX, nY)) return true;
        return false;
    })) {
        fromMap[hash(nX, nY)] = hash(x, y);
        queue.enq({ x: nX, y: nY, risk: risk + map[nX][nY] });
    }
}