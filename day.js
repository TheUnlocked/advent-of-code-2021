import fs from 'fs';
export default undefined;

const dayNum = process.argv[2];

if (!dayNum) {
    console.log('Usage:     node day <day-number>');
    process.exit();
}

fs.mkdirSync(`day${dayNum}`);
fs.writeFileSync(`day${dayNum}/p1.js`,

`import load from '../util/load.js';
export default undefined;

const content = load(${dayNum}).lines;

`
);

fs.writeFileSync(`day${dayNum}/p2.js`, '');
fs.writeFileSync(`inputs/day${dayNum}`, '');

console.log(`Run p1:    ./day${dayNum}/p1.js`);
console.log(`Run p2:    ./day${dayNum}/p2.js`);
console.log(`Input:     ./inputs/day${dayNum}`);