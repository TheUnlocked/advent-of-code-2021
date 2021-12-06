import load from '../util/load.js';
export default undefined;

const nums = load(6).raw.split(',');

const fishAtAge = Object.fromEntries(new Array(9).fill(0).map((x, i) => [i, 0]));

for (const num of nums) {
    fishAtAge[num] += 1;
}

for (let i = 0; i < 80; i++) {
    fishAtAge[9] = fishAtAge[0];
    fishAtAge[7] += fishAtAge[0];
    for (let age = 1; age <= 9; age++) {
        fishAtAge[age - 1] = fishAtAge[age];
    }
}

fishAtAge[9] = 0;

console.log(Object.entries(fishAtAge).map(x => x[1]).reduce((a, b) => a+b))