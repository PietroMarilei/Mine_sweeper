const board = []

const rows = 8;
const columns = 8;

const minesCount = 5;
let minesLocation = [] //'2-2''3-5'

let tileClicked = 0;
let flagEnable = false;

let gameOver = false;


window.onload = function () {
    startGame()
}

function startGame() {
    document.getElementById('mines_count').innerText = minesCount;

    //This is the 2d array creator. Create a row, then add the first col with a single cell, then goes to the second col and so on. Then create the new row etc. Assigning every tile an Id "row-col" to indentify that. 

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString()
            // add to dom
            document.getElementById("board").append(tile);
            // add the tile to the row array
            row.push(tile)
        }

        board.push(row);
        console.log(board);
    }



}