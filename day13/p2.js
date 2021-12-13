import load from '../util/load.js';
export default undefined;

const [dotsRaw, foldsRaw] = load(13).split();

let dots = dotsRaw.map(x => x.split(',').map(Number));
const folds = foldsRaw.map(x => x.slice('fold along '.length).split('='));
function dotsSet() {
    return new Set(dots.map(x => x.join(',')));
}

function foldAlongY(n) {
    dots = dots.flatMap(([x, y]) => {
        if (y === n) {
            return [];
        }
        if (y > n) {
            return [[x, 2 * n - y]];
        }
        return [[x, y]];
    });
}

function foldAlongX(n) {
    dots = dots.flatMap(([x, y]) => {
        if (x === n) {
            return [];
        }
        if (x > n) {
            return [[2 * n - x, y]];
        }
        return [[x, y]];
    });
}

for (const [dir, n] of folds) {
    if (dir === 'x') foldAlongX(+n);
    else foldAlongY(+n);
}

const width = Math.max(...dots.map(x => x[0])) + 1;
const height = Math.max(...dots.map(x => x[1])) + 1;

const set = dotsSet();

console.log(new Array(height).fill(0).map((_, y) => new Array(width).fill(0).map((_, x) => {
    if (set.has(`${x},${y}`)) {
        return '██';
    }
    return '  ';
}).join('')).join('\n'));