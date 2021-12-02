import load from '../util/load.js';
export default undefined;

const content = load(2).lines;
const instructions = content.map(x => x.split(' '))

let x = 0;
let y = 0;

instructions.forEach(([dir, n]) => {
    switch(dir) {
        case 'forward': x += +n; break;
        case 'down': y += +n; break;
        case 'up': y -= +n; break;
    }
})

console.log(x*y);