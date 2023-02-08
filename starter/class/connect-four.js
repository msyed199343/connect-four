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

    Screen.addCommand('w', 'Up', this.cursor.up.bind(this));
    Screen.addCommand('s', 'Down', this.cursor.down.bind(this));
    Screen.addCommand('a', 'left', this.cursor.left.bind(this));
    Screen.addCommand('d', 'Right', this.cursor.right.bind(this));
    Screen.addCommand('return', 'Place a move', ConnectFour.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    ConnectFour.turnMessage.call(this);
    Screen.printCommands();

  }

  static turnMessage() {
    Screen.setMessage(`It is ${this.playerTurn}'s turn`)
    Screen.render();
  }

  static placeMove() {
    let row = this.cursor.row;
    let col = this.cursor.col;

    if (Screen.grid[row][col] === ' '){
      Screen.setGrid(row, col, this.playerTurn);

      let winner = ConnectFour.checkWin(Screen.grid);

      if (winner) {
        ConnectFour.endGame(winner);
      }

      if (this.playerTurn === 'O') {
        this.playerTurn = 'X'
      } else this.playerTurn = 'O';

      ConnectFour.turnMessage.call(this);
      Screen.printCommands();

  } else {
      Screen.setMessage(`Spot already taken`);
      Screen.render();
      Screen.printCommands();
    }
  }


  static noWinCheck = grid => {
    // should return true if even one element in 2d array is empty (' ')
    let emptySpacesLeft = false

      grid.forEach(row => {
           row.some(i => i  === ' ') === true ? emptySpacesLeft = true : ""
      });

      return emptySpacesLeft
   }


   static checkDiagUp = (grid) => {

    let diagArray = [
      [grid[0][6], grid[1][5], grid[2][4], grid[3][3]],
      [grid[2][4], grid[3][3], grid[4][3], grid[5][2]],
      [grid[1][6], grid[2][5], grid[3][4], grid[4][3]],
      [grid[2][5], grid[3][4], grid[4][3], grid[5][2]],
      [grid[2][6], grid[3][5], grid[4][4], grid[5][3]],
      [grid[0][5], grid[1][4], grid[2][3], grid[3][2]],
      [grid[2][3], grid[3][2], grid[4][1], grid[5][0]],
      [grid[0][4], grid[1][3], grid[2][2], grid[3][1]],
      [grid[1][3], grid[2][2], grid[3][1], grid[4][0]],
      [grid[0][3], grid[1][2], grid[2][1], grid[3][0]]
    ]

let winner
let currentFour

  for(let i = 0; i < diagArray.length; i++){
      currentFour = diagArray[i]

      currentFour.every(j => j === currentFour[0] &&  j !== ' ')  ? winner = currentFour[0] : ""
  }


  console.log(winner)

    return winner == 'X'? 'X'
      : winner == 'O'? 'O'
      : "T"
}

  static checkDiagDown = (grid) => {

        let diagArray = [
          [grid[0][0], grid[1][1], grid[2][2], grid[3][3]],
          [grid[2][2], grid[3][3], grid[4][4], grid[5][5]],
          [grid[2][0], grid[3][1], grid[4][2], grid[5][3]],
          [grid[0][1], grid[1][2], grid[2][3], grid[3][4]],
          [grid[0][2], grid[1][3], grid[2][4], grid[3][5]],
          [grid[1][3], grid[2][4], grid[3][5], grid[4][6]],
          [grid[0][3], grid[1][4], grid[2][5], grid[3][6]]
        ]

    let winner
    let currentFour

      for(let i = 0; i < diagArray.length; i++){
          currentFour = diagArray[i]

          currentFour.every(j => j === currentFour[0] &&  j !== ' ')  ? winner = currentFour[0] : ""
      }




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
                      if (col.length < 1){
                        return
                      }
                      else if(firstTwo[0] === firstTwo[1] && firstTwo[1] === col[0] && col[0] === col[1] && col[0] !== ' '){
                        winner = col[0]
                      }
                      else{
                        firstTwoValuesOfCol = col.splice(0, 2)
                        checkCol(firstTwoValuesOfCol)
                      }

                      //console.log(winner)
                }

      })

   return winner === 'X' ? 'X'
    : winner === 'O' ? 'O'
    : 'T'
   }


  static checkHorizontal(grid){
    let winner
    let row

    grid.forEach((i) => {
      row = i.slice()

      let firstTwoValuesOfRow = row.splice(0, 2)

      checkRow(firstTwoValuesOfRow)

      function checkRow(firstTwo){

            if (row.length === 0){
              return
            }
            else if(firstTwo[0] === firstTwo[1] && firstTwo[1] === row[0] && row[0] === row[1] && row[0] !== ' '){
              winner = row[0]
            }
            else{
              firstTwoValuesOfRow[0] = row.shift()
              checkRow(firstTwoValuesOfRow)
            }



      }

    })



 return winner === 'X'? 'X'
   : winner === 'O'? 'O'
   : "T"

  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended


      let verticalWinner = this.checkVertical(grid)
      let horizontalWinner = this.checkHorizontal(grid)
      let diagDownWinner  = this.checkDiagDown(grid)
      let diaUpWinner = this.checkDiagUp(grid)
      let finishCheck = this.noWinCheck(grid)



     if (verticalWinner !== "T") {
      return verticalWinner
     }
     else if(horizontalWinner !== "T"){
      return horizontalWinner
     }
     else if(diagDownWinner !== "T"){
      return diagDownWinner
     }
     else if(diaUpWinner !== "T"){
      return diaUpWinner
     }
     else if((verticalWinner && horizontalWinner && diaUpWinner && diagDownWinner) === "T" && finishCheck !== true){
      return "T"
     }
     else{
      return false
     }
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
