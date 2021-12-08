import load from '../util/load.js';
export default undefined;

const data = load(8).lines.map(x => x.split(' | ').map(x => x.split(' ')));

const patterns = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg'
];

const hintMap = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
};

function solveLine(words) {
    const letters = [...'abcdefg'];
    const possibilities = Object.fromEntries(letters.map(x => [x, new Set(letters)]));

    for (const word of words) {
        if ([2,4,3,7].includes(word.length)) {
            const w = [...word];
            const targets = [...patterns[hintMap[word.length]]];

            letters.filter(x => !targets.includes(x))
                .forEach(x => w
                    .forEach(y => possibilities[x].delete(y)));
                    
            targets
                .forEach(x => letters
                    .filter(x => !w.includes(x))
                    .forEach(y => possibilities[x].delete(y)));
        }
    }

    const zero = words.filter(x => x.length === 6)
        .find(l => [...possibilities['d']].filter(x => !l.includes(x)).length === 1);
    const six = words.filter(x => x.length === 6)
        .find(l => [...possibilities['c']].filter(x => !l.includes(x)).length === 1);
    const nine = words.filter(x => x.length === 6)
        .find(l => [...possibilities['e']].filter(x => !l.includes(x)).length === 1);

    [...zero].forEach(x => possibilities['d'].delete(x));
    [...six].forEach(x => possibilities['c'].delete(x));
    [...nine].forEach(x => possibilities['e'].delete(x));

    const toSolve = new Set(letters);
    const solution = {};

    while (toSolve.size > 0) {
        const solved = [...toSolve].find(x => possibilities[x].size === 1);
        solution[solved] = [...possibilities[solved]][0];
        letters.forEach(x => possibilities[x].delete(solution[solved]));
        toSolve.delete(solved);
    }

    return Object.fromEntries(Object.entries(solution).map(([a, b]) => [b, a]));
}

function getNumber(w) {
    const wSet = new Set(w);

    return patterns.map(x => [...x]).findIndex(p => p.length === wSet.size && p.every(l => wSet.has(l)))
}

let total = 0;
for (const [normal, target] of data) {
    const solution = solveLine(normal.concat(target));
    const val = +target.map(x => getNumber([...x].map(x => solution[x]).join(''))).join('');
    total += val;
}

console.log(total);
