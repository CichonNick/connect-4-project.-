/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//const WIDTH = 7;
//const HEIGHT = 6;

//let currPlayer = 1; // active player: 1 or 2
//let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

// new code
class game  {
  constructor(p1, p2, height = 6, width = 7)
{
  this.players = [p1,p2];
  this.width= width;
  this.height = height;
  this.currPlayer = p1;
  this.makeBoard();
  this.makeHtmlBoard();
  this.gameOver = false;
}

// new code
makeBoard() {
  this.board = [];
  for (let y = 0; y < this.height; y++) {
    this.board.push(Array.from({ length: this.width }));
  }
}


// new code
makeHtmlBoard() {
  const board = document.getElementById('board');
  this.board.innerHTML = '';


  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');

  // new code
  this.handleClick = this.handleClick.bind(this);
  top.addEventListener('click', this.handleClick);

  for (let x = 0; x < this.width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // new code
  for (let y = 0; y < this.height; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}


// new code
 findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}


// new code
placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${this.currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}


// new code
endGame(msg) {
  alert(msg);
  const top = document.querySelector("#colum-top");
  top.removeEventListener("click",this.handleClick);
}


// new code
handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

// new code
  const y = this.findSpotForCol(x);
  if (y === null) {
    return;
  }

// new code
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);
  
// new code
  if (this.checkForWin()) {
    return this.endGame(`Player ${this.currPlayer} won!`);
  }
  
// new code
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }
    
// new code
  this.currPlayer = this.currPlayer === 1 ? 2 : 1;
}

// new code
checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }

// new code
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
        }
      }
    }
  }
}

// new code
class Player{
  constructor(color){
    this.color= color;
  }
}

document.getElementById("start-game").addEventListener("click",function(){
let p1 = new Player (documet.getElementById('p1-color').value);
let p2 = new Player (documet.getElementById('p2-color').value);
new Gamepad(p1, p2);
});


