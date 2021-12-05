import load from '../util/load.js';
export default undefined;

const content = load(5).lines;

function isOrthogonal([[x11, y11], [x21, y21]]) {
    return (x11 === x21)
        || (y21 === y11);
}

const lines = content.map(x => x.split(' -> ').map(x => x.split(',').map(x => +x))).filter(isOrthogonal);

const overlappingPonts = new Set();

function getOverlaps(start1, end1, start2, end2) {
    if (start1 > end1) [start1, end1] = [end1, start1];
    if (start2 > end2) [start2, end2] = [end2, start2];

    if (start1 > end2 || start2 > end1) return [];

    if (start1 > start2) {
        if (end1 > end2) {
            return new Array(end2 - start1 + 1).fill(0).map((_, i) => i + start1);
        }
        else {
            return new Array(end1 - start1 + 1).fill(0).map((_, i) => i + start1);
        }
    }
    else {
        if (end1 > end2) {
            return new Array(end2 - start2 + 1).fill(0).map((_, i) => i + start2);
        }
        else {
            return new Array(end1 - start2 + 1).fill(0).map((_, i) => i + start2);
        }
    }
}

function inRange(a, b, v) {
    return v >= Math.min(a, b) && v <= Math.max(a, b);
}

function addOverlaps([[x11, y11], [x21, y21]], [[x12, y12], [x22, y22]]) {
    if (x11 === x21) {
        // 1 vert
        if (x12 === x22) {
            // 12 vert
            if (x11 === x12) {
                for (const y of getOverlaps(y11, y21, y12, y22)) {
                    overlappingPonts.add(`${x11},${y}`);
                }
            }
        }
        // 1 vert 2 horiz
        else if (inRange(x12, x22, x11) && inRange(y11, y21, y12)) {
            overlappingPonts.add(`${x11},${y12}`);
        }
    }
    else {
        // 1 horiz
        if (y12 === y22) {
            // 12 horiz
            if (y11 === y12) {
                for (const x of getOverlaps(x11, x21, x12, x22)) {
                    overlappingPonts.add(`${x},${y11}`);
                }
            }
        }
        // 1 horiz 2 vert
        else if (inRange(x11, x21, x12) && inRange(y12, y22, y11)) {
            overlappingPonts.add(`${x12},${y11}`);
        }
    }
}

for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
        addOverlaps(lines[i], lines[j])
    }
}

console.log(overlappingPonts.size);