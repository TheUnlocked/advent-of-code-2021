import load from '../util/load.js';
export default undefined;

const nums = load(8).lines.map(x => x.split(' | ').map(x => x.split(' ')));

console.log(nums.map(x => x[1].filter(x => [2,4,3,7].includes(x.length)).length).reduce((a, b) => a + b));