/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
const restartBtn = document.querySelector('button');

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(HEIGHT, WIDTH) {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board =[...Array(HEIGHT)].map(() => Array(WIDTH).fill(null));
  return board;
 }

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  //make top row of table
  const top = document.createElement("tr");
  //tr will have ID of "column-top"
  top.setAttribute("id", "column-top");
  //add eventlistener to tr when it is clicked run handleClick function
  top.addEventListener("click", handleClick);

  //create same number of td as WIDTH and set new td ID to index
  //and attach td to tr
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //create tr for the same amount as HEIGHT
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //when creating 1 tr create the same amount of td as Width and attached to the tr row.
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let colNum = 5;
  while(board[colNum][x]===1 || board[colNum][x]===2){
    colNum --;
  }
  
  return colNum;
 
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  if (checkForWin()) {
    return;
  }
  const ball = document.createElement("div");
  ball.setAttribute("class", "piece");
  document.querySelector(`td[id="${y}-${x}"`).append(ball)
  if(currPlayer===1){
    ball.classList.add("p1");
  } else {
    ball.classList.add("p2");
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // console.log("x", x);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }
  // console.log("y", y);

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(arr => !arr.includes(null))){
    endGame("It's a tie!");
  }



  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer===1){
    currPlayer = 2;
  } else{
    currPlayer =1;
  }
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    // run each row
    for (let  x = 0; x < WIDTH; x++) {
      //get 4  cells from each [y, x] position
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //check if each horiz, vert, diagDR, diagDL of four cells are fill with currPlayer
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// restartBtn.addEventListener(function(e){
  
// });

makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();