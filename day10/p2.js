import load from '../util/load.js';
export default undefined;

const content = load(10).lines;

const openMap = {
    '[': ']',
    '{': '}',
    '(': ')',
    '<': '>'
}

const scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

const open = Object.keys(openMap);
const close = Object.values(openMap);

let lineScores = [];

start:
for (const line of content) {
    const charStack = [];
    for (const char of line) {
        if (open.includes(char)) {
            charStack.push(openMap[char]);
        }
        else {
            const toClose = charStack.pop();
            if (toClose !== char) {
                // corrupt
                continue start;
            }
        }
    }
    
    let lineScore = 0;
    while (charStack.length > 0) {
        const ch = charStack.pop();
        lineScore *= 5;
        lineScore += scores[ch];
    }
    lineScores.push(lineScore)
}

console.log(lineScores.sort((a, b)=> a - b)[Math.floor(lineScores.length / 2)]);
