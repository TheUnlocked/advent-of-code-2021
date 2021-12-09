import load from '../util/load.js';
export default undefined;

const nums = load(9).grid.map(x => x.map(x => +x));

let lowRisks = 0;

for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[0].length; j++) {
        const val = nums[i][j];
        if (val < Math.min(...[nums[i-1]?.[j], nums[i+1]?.[j], nums[i][j-1], nums[i][j+1]].map(x => x ?? Infinity))) {
            lowRisks += val + 1;
        }
    }
}

console.log(lowRisks)