import load from '../util/load.js';
export default undefined;

const nums = load(7).raw.split(',').map(x => +x);

const avg = nums.sort()[nums.length / 2];

const options = new Array(100).fill(0).map((_, i) => i + avg - 2);

console.log(Math.min(...options.map(avg => nums.map(x => Math.abs(x - avg)).reduce((a, b) => a+b))))