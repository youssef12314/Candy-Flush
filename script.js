console.log("her er javascript");
//global variables
let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let columns= 9;
let score = 0;

function initializeBoard(){
    let gameBoardElement=document.getElementById("game-board");

    //looping through each row
    for(let i = 0; i < rows; i++) {
        let row = [];
        //loop through each column in current row
        for(let j = 0; j < columns; j++){
            let randomIndex = Math.floor(Math.random() * candies.length);
            let candy = candies[randomIndex];
            row.push(candy)
        }

        board.push(row)
    }


    //display of game board
    for (let i = 0; i < rows; i++) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (let j = 0; j < columns; j++) {
            let cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent=board[i][j];
            rowElement.appendChild(cellElement);
        }
        gameBoardElement.appendChild(rowElement);
    }

    //calling detectmatch function
let matches = detectMatches();
console.log(matches);
}



function detectMatches(){
    //here stores matched candy
    let matches = []
    
    //checks horizontal for matches
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns - 2; j++) {
            let candy = board[i][j];
            if (candy !== 0 && candy === board[i][j + 1] && candy === board[i][j + 2]) {
                //finds a horizontal match of three candies
                matches.push({ row: i, column: j})
                matches.push({ row: i, column: j + 1});
                matches.push({ row: i, column: j + 2});
                console.log("Horizontal match found at row " + i + ", column " + j);
            }
        }
    }

    //checks vertically for matches
    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 2; i++) {
            let candy = board[i][j];
            if (candy !== 0 && candy === board[i +1][j] && candy === board[i + 2][j]){
                //finds a vertical match of three candies
                matches.push({ row: i, column: j});
                matches.push({ row: i + 1, column: j});
                matches.push({ row: i + 2, column: j});
                console.log("Vertical match found at row " + i + ", column " + j);
            }
        }
   }
   return matches;

}

window.onload=function(){
    initializeBoard();
    console.log(board);
}