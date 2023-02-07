const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    Screen.render()
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render()
    Screen.printCommands()
  }

  up = () => {
    // Move cursor up
    this.resetBackgroundColor();
    this.row !== 0 ? this.row-- : ""
    this.setBackgroundColor();
  }

  down = () =>{
    this.resetBackgroundColor();
    this.row !== 2 ? this.row++ : ""
    this.setBackgroundColor();
  }

  left = () => {
    // Move cursor left
    this.resetBackgroundColor();
    this.col !== 0 ? this.col-- : ""
    this.setBackgroundColor();
  }

  right = () => {
    // Move cursor right
    this.resetBackgroundColor();
    this.col !== 2 ? this.col++ : ""
    this.setBackgroundColor();
  }

}


module.exports = Cursor;
