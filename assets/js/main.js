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

function setMines() {
    minesLocation.push("2-2")
    minesLocation.push("2-3")
    minesLocation.push("1-1")
}

function startGame() {
    document.getElementById('mines_count').innerText = minesLocation;
    document.getElementById('flag_button').addEventListener('click', setFlag)
    //This is the 2d array creator. Create a row, then add the first col with a single cell, then goes to the second col and so on. Then create the new row etc. Assigning every tile an Id "row-col" to indentify that. 
    for (let r = 0; r < rows; r++) {
        // Creatthe 1 wmpty row 
        let row = []
        //starting from 0 col populate the row with col containing sigle tile
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString()
            tile.addEventListener('click', clickTile)
            // add to dom
            document.getElementById("board").append(tile);
            // add the tile to the row array
            row.push(tile)
        }

        board.push(row);
    }
    console.log(board);
    setMines()
    console.log(minesLocation);
}

function setFlag() {
    if (flagEnable) {
        flagEnable = false;
        document.getElementById("flag_button").style.backgroundColor = "lightgrey"

    } else {
        flagEnable = true;
        document.getElementById("flag_button").style.backgroundColor = "darkgrey"
    }
}

function clickTile() {
    //this si riferisce all'elemento cliccato che scatena l'evento, appunto tile
    let tile = this
    if (flagEnable) {
        // toggle flag function is true the replace text
        if (tile.innerText == "") {
            tile.innerText = "🚩"

        } else if (tile.innerText == "🚩") {
            tile.innerText = ""
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }
}

function revealMines() {

}