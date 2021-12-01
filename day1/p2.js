import load from '../util/load.js';
export default undefined;

const nums = load(1).nums;

console.log(nums.slice(3).map((x, i) => nums[i + 3] > nums[i] ? 1 : 0).reduce((a, b) => a + b))