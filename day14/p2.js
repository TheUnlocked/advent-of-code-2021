import load from '../util/load.js';
export default undefined;

let [template, , ...rules] = load(14).lines;

rules = Object.fromEntries(rules.map(x => x.split(' -> ')));

const occurrences = {};
let pairCounts = {};

for (let i = 0; i < template.length; i++) {
    occurrences[template[i]] ??= 0;
    occurrences[template[i]] += 1;
    const pair = template[i] + template[i + 1];
    pairCounts[pair] ??= 0;
    pairCounts[pair] += 1;
}

function step() {
    const newPairCounts = {};
    for (const [pair, count] of Object.entries(pairCounts)) {
        const newElt = rules[pair];
        if (newElt) {
            occurrences[newElt] ??= 0;
            occurrences[newElt] += count;
    
            const newPair1 = pair[0] + newElt;
            const newPair2 = newElt + pair[1];
            newPairCounts[newPair1] ??= 0;
            newPairCounts[newPair1] += count;
            newPairCounts[newPair2] ??= 0;
            newPairCounts[newPair2] += count;
        }
    }
    pairCounts = newPairCounts;
}

for (let i = 0; i < 40; i++) step();

const sorted = Object.entries(occurrences).sort(([_, a], [__, b]) => b - a).map(x => x[1]);

console.log(sorted[0] - sorted.at(-1));