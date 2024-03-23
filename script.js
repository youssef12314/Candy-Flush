console.log("Here is JavaScript");

// Global variables
let candyImages = ["candy-blue.png", "candy-cane.png", "candy-green.png", "candy-orange.png", "candy-pink.png", "candy-red.png"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

function initializeBoard() {
    let gameBoardElement = document.getElementById("game-board");

    // Clear previous content
    gameBoardElement.innerHTML = '';

    // Loop through each row
    for (let i = 0; i < rows; i++) {
        let row = [];
        // Loop through each column in the current row
        for (let j = 0; j < columns; j++) {
            let randomIndex = Math.floor(Math.random() * candyImages.length);
            let candyImg = document.createElement("img");
            candyImg.classList.add("candy");
            candyImg.src = "Candies/" + candyImages[randomIndex];
            candyImg.setAttribute("data-candy", candyImages[randomIndex]); // stored candy type as data attribute
            row.push(candyImg);
        }
        board.push(row);
    }

    // Display game board
    for (let i = 0; i < rows; i++) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (let j = 0; j < columns; j++) {
            let cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.appendChild(board[i][j]);
            rowElement.appendChild(cellElement);
        }
        gameBoardElement.appendChild(rowElement);
    }

    // Call detectmatch function
    let matches = detectMatches();
    console.log(matches);
}

function detectMatches() {
    let matches = [];
    let candiesToRemove = [];

    // Checks horizontal for matches
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 2; j++) {
            let candy = board[i][j].getAttribute("data-candy");
            if (candy === board[i][j + 1].getAttribute("data-candy") && candy === board[i][j + 2].getAttribute("data-candy")) {
                // Finds a horizontal match of three candies
                matches.push({ row: i, column: j });
                matches.push({ row: i, column: j + 1 });
                matches.push({ row: i, column: j + 2 });
                candiesToRemove.push({ row: i, column: j });
                candiesToRemove.push({ row: i, column: j + 1 });
                candiesToRemove.push({ row: i, column: j + 2 });
                console.log("Horizontal match found at row " + i + ", column " + j);
            }
        }
    }

    // Checks vertically for matches
    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 2; i++) {
            let candy = board[i][j].getAttribute("data-candy");
            if (candy === board[i + 1][j].getAttribute("data-candy") && candy === board[i + 2][j].getAttribute("data-candy")) {
                // Finds a vertical match of three candies
                matches.push({ row: i, column: j });
                matches.push({ row: i + 1, column: j });
                matches.push({ row: i + 2, column: j });
                candiesToRemove.push({ row: i, column: j });
                candiesToRemove.push({ row: i + 1, column: j });
                candiesToRemove.push({ row: i + 2, column: j });
                console.log("Vertical match found at row " + i + ", column " + j);
            }
        }
    }

    // Remove the matched candy from the board
    for (let candy of candiesToRemove) {
        board[candy.row][candy.column].src = ""; 
        board[candy.row][candy.column].setAttribute("data-candy", ""); 
    }

    return matches;
}

window.onload = function () {
    initializeBoard();
    console.log(board);
};