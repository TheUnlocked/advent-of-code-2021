import load from '../util/load.js';
export default undefined;

const content = load(5).lines;

const lines = content.map(x => x.split(' -> ').map(x => x.split(',').map(x => +x)));

const tiles = {};

function isOrthogonal([[x1, y1], [x2, y2]]) {
    return (x1 === x2)
        || (y2 === y1);
}

for (const line of lines) {
    const [[x1, y1], [x2, y2]] = line;

    if (isOrthogonal(line)) {
        if (y1 === y2) {
            // |
            for (let i = 0; i <= Math.max(x1, x2) - Math.min(x1, x2); i++) {
                const index = `${i + Math.min(x1, x2)},${y1}`
                tiles[index] = (tiles[index] ?? 0) + 1;
            }
        }
        else {
            // -
            for (let i = 0; i <= Math.max(y1, y2) - Math.min(y1, y2); i++) {
                const index = `${x1},${i + Math.min(y1, y2)}`
                tiles[index] = (tiles[index] ?? 0) + 1;
            }
        }
    }
    else {
        if ((x2 - x1) * (y2 - y1) > 0) {
            // /
            for (let i = 0; i <= Math.max(x1, x2) - Math.min(x1, x2); i++) {
                const index = `${i + Math.min(x1, x2)},${i + Math.min(y1, y2)}`
                tiles[index] = (tiles[index] ?? 0) + 1;
            }
        }
        else {
            // \
            for (let i = 0; i <= Math.max(x1, x2) - Math.min(x1, x2); i++) {
                const index = `${i + Math.min(x1, x2)},${Math.max(y1, y2) - i}`
                tiles[index] = (tiles[index] ?? 0) + 1;
            }
        }
    }
}

console.log(Object.keys(tiles).filter(x => tiles[x] >= 2).length);