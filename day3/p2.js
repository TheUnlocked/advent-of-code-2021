import load from '../util/load.js';
export default undefined;

const content = load(3).grid;

let mostCommon = content;
let leastCommon = content;

for (let i = 0; i < content[0].length; i++) {
    if (mostCommon.length === 1) break;
    const ones = mostCommon.map(x => x[i]).filter(x => x == 1).length;
    const zeroes = mostCommon.map(x => x[i]).filter(x => x == 0).length;
    if (ones >= zeroes) {
        mostCommon = mostCommon.filter(x => x[i] == 1);
    }
    else {
        mostCommon = mostCommon.filter(x => x[i] == 0);
    }
}

for (let i = 0; i < content[0].length; i++) {
    if (leastCommon.length === 1) break;
    const ones = leastCommon.map(x => x[i]).filter(x => x == 1).length;
    const zeroes = leastCommon.map(x => x[i]).filter(x => x == 0).length;
    if (ones >= zeroes) {
        leastCommon = leastCommon.filter(x => x[i] == 0);
    }
    else {
        leastCommon = leastCommon.filter(x => x[i] == 1);
    }
}

console.log(parseInt(mostCommon[0].join(''), 2) * parseInt(leastCommon[0].join(''), 2))