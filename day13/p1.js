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

const [dir, n] = folds[0];
if (dir === 'x') foldAlongX(+n);
else foldAlongY(+n);

console.log(dotsSet().size)