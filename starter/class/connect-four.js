const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  static noWinCheck = grid => {
    // should return true if even one element in 2d array is empty (' ')
    let emptySpacesLeft = false

      grid.forEach(row => {
           row.some(i => i  === ' ') === true ? emptySpacesLeft = true : ""
      });

      return emptySpacesLeft
   }

  static checkDiag = (grid) => {
    this.emptyGridCheck === true ?  false : ""

    let winner
    let diagOne = [grid[0][0], grid[1][1], grid[2][2]]
    let diagTwo = [grid[0][2], grid[1][1], grid[2][0]]

    diagOne.every(i => i === diagOne[0])  ? winner = diagOne[0]
    : diagTwo.every(i => i === diagTwo[0]) ? winner = diagTwo[0]:""

        return winner == 'X'? 'X'
          : winner == 'O'? 'O'
          : "T"
  }

  static checkVertical = (grid) =>{
    let winner
    let col = []

      grid[0].forEach((val, i) => {
            for(let j = 0; j < 7; j++){
                  col.length < 6 ? col.push(grid[j][i]) : ""
            }

              //need to check 6 vertical so checking two at a time with recursion to remove repetitive code

              let firstTwoValuesOfCol = col.splice(0, 2)
                checkCol(firstTwoValuesOfCol)

                function checkCol(firstTwo){
                      if (col.length === 0){
                        return
                      }
                      else if(firstTwo[0] === firstTwo[1] && firstTwo[1] === col[0] && col[0] === col[1] && col[0] !== ' '){
                        winner = col[0]
                      }
                      else{
                        firstTwoValuesOfCol = col.splice(0, 2)
                        checkCol(firstTwoValuesOfCol)
                      }
                }

      })

   return winner === 'X' ? 'X'
    : winner === 'O' ? 'O'
    : "T"
   }


  static checkHorizontal(grid){
    let winner
    let row
    grid.forEach( i => i.every( i2 => i2 === 'X') ? winner = 'X' : '' )
    grid.forEach (i => i.every( i2 => i2 === 'O') ? winner = 'O' : '')


 return winner == 'X'? 'X'
   : winner == 'O'? 'O'
   : "T"

  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

      let horizontalWinner = this.checkHorizontal(grid)
      let verticalWinner = this.checkVertical(grid)
      let diagWinner = this.checkDiag(grid)
      let finishCheck = this.noWinCheck(grid)

      //console.log(verticalWinner)

      return horizontalWinner !== "T" ? horizontalWinner
      : verticalWinner !== "T" ? verticalWinner
      : diagWinner !== "T" ? diagWinner
      : this.emptyGridCheck === true ? false
      : (horizontalWinner && verticalWinner && diagWinner) === "T" && finishCheck !== true ? "T"
      : false



  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
