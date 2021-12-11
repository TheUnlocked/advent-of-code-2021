import load from '../util/load.js';
export default undefined;

const content = load(11).grid;

let octs = content.map(x => x.map(x => ({ notFlashed: true, val: +x })))

function reset() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            octs[i][j].notFlashed = true;
        }
    }
}

function getFlashed(i, j) {
    if (octs[i]?.[j] && octs[i][j].notFlashed) {
        octs[i][j].val++;
        if (octs[i][j].val > 9) {
            flash(i, j);
        }
    }
}

function flash(i, j) {
    octs[i][j].val = 0;
    octs[i][j].notFlashed = false;
    
    getFlashed(i + 1, j    );
    getFlashed(i - 1, j    );
    getFlashed(i    , j + 1);
    getFlashed(i    , j - 1);
    getFlashed(i + 1, j + 1);
    getFlashed(i - 1, j - 1);
    getFlashed(i - 1, j + 1);
    getFlashed(i + 1, j - 1);
}

function step() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            octs[i][j].val++;
        }
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (octs[i][j].val > 9) {
                flash(i, j);
            }
        }
    }
}

function isSynchronized() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (octs[i][j].val !== 0) {
                return false;
            }
        }
    }
    return true;
}

for (let i = 0; true; i++) {
    reset();
    step();
    if (isSynchronized()) {
        console.log(i + 1);
        break;
    }
}
