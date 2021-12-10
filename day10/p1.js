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
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const open = Object.keys(openMap);
const close = Object.values(openMap);

let score = 0;

for (const line of content) {
    const charStack = [];
    for (const char of line) {
        if (open.includes(char)) {
            charStack.push(char);
        }
        else {
            const toClose = charStack.pop();
            if (openMap[toClose] !== char) {
                // corrupt
                score += scores[char];
                break;
            }
        }
    }
}

console.log(score);
