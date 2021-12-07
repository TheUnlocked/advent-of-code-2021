import load from '../util/load.js';
export default undefined;

const nums = load(7).raw.split(',').map(x => +x);

function distance(a, b) {
    let total = 0;
    const dist = Math.abs(a - b);
    for (let i = 0; i < dist; i++) total += i + 1;
    return total;
}

const avg = nums.sort()[nums.length / 2];

const options = new Array(1000).fill(0).map((_, i) => i + avg - 2);

console.log(Math.min(...options.map(avg => nums.map(x => distance(x, avg)).reduce((a, b) => a+b))))