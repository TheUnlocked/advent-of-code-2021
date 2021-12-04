import load from '../util/load.js';
export default undefined;

const content = load(4).split();

const numbers = content[0][0].split(',');

let boards = content.slice(1).map(x => x.map(x => x.split(' ').filter(x => x !== '')));
let boardCorrects = boards.map(x => x.map(x => x.map(x => false)));

function checkBoard(board) {
    for (let i = 0; i < 5; i++) {
        let all = true;
        for (let j = 0; j < 5; j++) {
            if (!board[i][j]) {
                all = false;
                break;
            }
        }
        if (all) {
            return true;
        }
    }
    for (let i = 0; i < 5; i++) {
        let all = true;
        for (let j = 0; j < 5; j++) {
            if (!board[j][i]) {
                all = false;
                break;
            }
        }
        if (all) {
            return true;
        }
    }
    return false;
}

function updateBoard(boardIndex, n) {
    const board = boards[boardIndex];
    for (let i = 0; i < 5; i++) {
        const row = board[i];
        for (let j = 0; j < 5; j++) {
            if (row[j] === n) {
                boardCorrects[boardIndex][i][j] = true;
                return;
            }
        }
    }
}

function getScore(boardIndex) {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (!boardCorrects[boardIndex][i][j]) {
                sum += +boards[boardIndex][i][j];
            }
        }
    }
    return sum;
}

for (const n of numbers) {
    let remove = [];
    for (let i = 0; i < boards.length; i++) {
        updateBoard(i, n)
        
        if (checkBoard(boardCorrects[i])) {
            if (boards.length === 1) {
                console.log(getScore(0) * +n);
            }
            remove.push(i);
        }
    }
    boards = boards.filter((_, i) => !remove.includes(i));
    boardCorrects = boardCorrects.filter((_, i) => !remove.includes(i));
}