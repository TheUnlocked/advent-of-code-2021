import load from '../util/load.js';
export default undefined;

const nums = load(9).grid.map(x => x.map(x => +x));

let basins = [];

for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[0].length; j++) {
        if (nums[i][j] < Math.min(...[nums[i-1]?.[j], nums[i+1]?.[j], nums[i][j-1], nums[i][j+1]].map(x => x ?? Infinity))) {
            const visited = new Set();
            const toVisit = new Set([`${i},${j}`]);
    
            while (toVisit.size > 0) {
                const next = toVisit.values().next().value;
                toVisit.delete(next);
                const [x, y] = next.split(',').map(x => +x);
                
                for (const [a, b] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
                    if (nums[a]?.[b] !== undefined && nums[a]?.[b] !== 9) {
                        if (!visited.has(`${a},${b}`)) {
                            visited.add(`${a},${b}`);
                            toVisit.add(`${a},${b}`);
                        }
                    }
                }
            }

            basins.push([...visited]);
        }
    }
}

console.log(basins.map(x => x.length).sort((a,b) => b-a).slice(0, 3).reduce((a, b) => a * b));