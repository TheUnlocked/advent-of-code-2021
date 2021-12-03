import load from '../util/load.js';
export default undefined;

const content = load(3).grid;

let mcb = [];
let lcb = [];

for (let i = 0; i < content[0].length; i++) {
    const ones = content.map(x => x[i]).filter(x => x == 1).length;
    const zeroes = content.map(x => x[i]).filter(x => x == 0).length;
    if (ones > zeroes) {
        mcb.push('1');
        lcb.push('0');
    }
    else {
        mcb.push('0');
        lcb.push('1');
    }
}

const gamma = parseInt(mcb.join(''), 2);
const epsilon = parseInt(lcb.join(''), 2);
console.log(gamma * epsilon)