const board = []

const rows = 8;
const columns = 8;

const minesCount = 5;
let minesLocation = [] //'2-2''3-5'

let tilesClicked = 0;
let flagEnable = false;

let gameOver = false;

let userPoints = 0


window.onload = function () {
    startGame()
}

function setMines() {
    // minesLocation.push("2-2")
    // minesLocation.push("2-3")
    // minesLocation.push("1-1")

    let minesLeft = minesCount
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    document.getElementById('mines_count').innerText = minesLocation;
    document.getElementById('flag_button').addEventListener('click', setFlag)

    //This is the 2d array creator. Create a row, then add the first col with a single cell, then goes to the second col and so on. Then create the new row etc. Assigning every tile an Id "row-col" to indentify that. 
    for (let r = 0; r < rows; r++) {
        // Create 1 empty row 
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
    if (gameOver || this.classList.contains("tile_clicked")) {
        return;
        //siccome game over== true non va questa non va
    }
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
        gameOver = true;
        revealMines();
        //alert("GAME OVER");
        return;
    }

    let coords = tile.id.split("-") // "1-1"=> ["1","1"] queste sono le coord di un singolo tile ottenute dal suo id. 
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    //ho ottenuto le sue coordinate
    checkMine(r, c)
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣"
                tile.style.backgroundColor = "red"
            }

        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns)
        return;
    // no mines out of buond
    let minesFound = 0;
    if (board[r][c].classList.contains("tile_clicked")) {
        return;
    }

    board[r][c].classList.add("tile_clicked")
    tilesClicked += 1

    //check top 3 tiles, dice solo quante mine ha trovato vicine sopra
    minesFound += checkTile(r - 1, c - 1)   //top left
    minesFound += checkTile(r - 1, c)      //top
    minesFound += checkTile(r - 1, c + 1)   //top right

    //check left right tiles
    minesFound += checkTile(r, c - 1)       //left
    minesFound += checkTile(r, c + 1)      //right

    //check bottom 3 tiles
    minesFound += checkTile(r + 1, c - 1)   //bot left
    minesFound += checkTile(r + 1, c)       //bot
    minesFound += checkTile(r + 1, c + 1)   //bot right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
        // 💚points go here ?
    }
    else {
        checkMine(r - 1, c - 1);    //top left
        checkMine(r - 1, c);      //top
        checkMine(r - 1, c + 1);    //top right

        //left and right
        checkMine(r, c - 1);      //left
        checkMine(r, c + 1);      //right

        //bottom 3
        checkMine(r + 1, c - 1);    //bottom left
        checkMine(r + 1, c);      //bottom
        checkMine(r + 1, c + 1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById('mines_count').innerText = "Cleared";
        gameOver = true;
        //sta roba non funziona, lascia aperte delle caselle
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}