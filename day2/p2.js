import load from '../util/load.js';
export default undefined;

const content = load(2).lines;
const instructions = content.map(x => x.split(' '))

let x = 0;
let y = 0;
let aim = 0;

instructions.forEach(([dir, n]) => {
    switch(dir) {
        case 'forward': x += +n; y += aim * +n; break;
        case 'down': aim += +n; break;
        case 'up': aim += -n; break;
    }
})

console.log(x*y);