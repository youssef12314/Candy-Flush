window.addEventListener("load", start);

function start() {
  console.log("Here is JavaScript");
  initializeBoard();
  console.log(board);
  detectMatches();
}

// Global variables
let candyImages = [
  "candy-blue.png",
  "candy-cane.png",
  "candy-green.png",
  "candy-orange.png",
  "candy-pink.png",
  "candy-red.png",
];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let selectedCandy = null;
let startX, startY;

//initialization of board
function initializeBoard() {
  let gameBoardElement = document.getElementById("game-board");

  gameBoardElement.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      let randomIndex = Math.floor(Math.random() * candyImages.length);
      let candyImg = document.createElement("img");
      candyImg.classList.add("candy");
      candyImg.setAttribute("draggable", true);
      candyImg.src = "Candies/" + candyImages[randomIndex];
      candyImg.setAttribute("data-candy", candyImages[randomIndex]); // stored candy type as data attribute
      candyImg.setAttribute("data-row", i);
      candyImg.setAttribute("data-column", j);
      candyImg.addEventListener("dragstart", dragStart);
      candyImg.addEventListener("dragend", dragEnd);
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

      cellElement.addEventListener("dragover", dragOver);
      cellElement.addEventListener("dragenter", dragEnter);
      cellElement.addEventListener("drop", dragDrop);

      cellElement.appendChild(board[i][j]);
      rowElement.appendChild(cellElement);
    }
    gameBoardElement.appendChild(rowElement);
  }
}

//drag candies
function dragStart(event) {
  selectedCandy = event.target;
  startX = event.clientX;
  startY = event.clientY;
}

function dragEnd(event) {
  selectedCandy = null;
  detectMatches(); // Call detectMatches after every move
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
}

function dragDrop(event) {
  event.preventDefault();
  let hoveredCandy = event.target;
  let hoveredRow = hoveredCandy.getAttribute("data-row");
  let hoveredColumn = hoveredCandy.getAttribute("data-column");
  let selectedRow = selectedCandy.getAttribute("data-row");
  let selectedColumn = selectedCandy.getAttribute("data-column");

  // Swap candies only if they are adjacent
  if (
    Math.abs(hoveredRow - selectedRow) +
      Math.abs(hoveredColumn - selectedColumn) ===
    1
  ) {
    let tempSrc = hoveredCandy.src;
    hoveredCandy.src = selectedCandy.src;
    hoveredCandy.setAttribute(
      "data-candy",
      selectedCandy.getAttribute("data-candy")
    );
    selectedCandy.src = tempSrc;
    selectedCandy.setAttribute(
      "data-candy",
      tempSrc.substring(tempSrc.lastIndexOf("/") + 1)
    ); 
  }
  detectMatches();
}
//detection for matches
function detectMatches() {
  let matches = [];
  let candiesToRemove = [];

  // Checks horizontal for matches
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns - 2; j++) {
      let candy = board[i][j].getAttribute("data-candy");
      if (
        candy === board[i][j + 1].getAttribute("data-candy") &&
        candy === board[i][j + 2].getAttribute("data-candy")
      ) {
        // Finds a horizontal match of three candies
        matches.push({ row: i, column: j });
        matches.push({ row: i, column: j + 1 });
        matches.push({ row: i, column: j + 2 });
        candiesToRemove.push({ row: i, column: j });
        candiesToRemove.push({ row: i, column: j + 1 });
        candiesToRemove.push({ row: i, column: j + 2 });
        console.log("Horizontal match found at row " + i + ", column " + j);
        score += 4;
      }
    }
  }

  // Checks vertically for matches
  for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows - 2; i++) {
      let candy = board[i][j].getAttribute("data-candy");
      if (
        candy === board[i + 1][j].getAttribute("data-candy") &&
        candy === board[i + 2][j].getAttribute("data-candy")
      ) {
        // Finds a vertical match of three candies
        matches.push({ row: i, column: j });
        matches.push({ row: i + 1, column: j });
        matches.push({ row: i + 2, column: j });
        candiesToRemove.push({ row: i, column: j });
        candiesToRemove.push({ row: i + 1, column: j });
        candiesToRemove.push({ row: i + 2, column: j });
        console.log("Vertical match found at row " + i + ", column " + j);
        score += 4;
      }
    }
  }

  // Remove the matched candy from the board and replace it with new random candies
  for (let candy of candiesToRemove) {
    // Replace with a new random candy
    let randomIndex = Math.floor(Math.random() * candyImages.length);
    board[candy.row][candy.column].src = "Candies/" + candyImages[randomIndex];
    board[candy.row][candy.column].setAttribute(
      "data-candy",
      candyImages[randomIndex]
    );
  }

  // Score display
  document.getElementById("game-score").textContent = "Score: " + score;
  return matches;
}
