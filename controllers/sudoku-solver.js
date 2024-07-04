class SudokuSolver {
  checkIsThereADot(puzzleString, row, column) {
    // A -> 0
    // B -> 1
    // C -> 2
    row = row.charCodeAt(0) - 65

    // 1 -> 0
    // 2 -> 1
    // 3 -> 2
    column -= 1

    // if the targeted place is dot
    if (puzzleString[row * 9 + column] === '.') {
      return true
    }

    // if it is empty
    return false
  }

  checkRowPlacement(puzzleString, row, value) {
    // A -> 0
    // B -> 1
    // C -> 2
    row = (row.charCodeAt(0) - 65) * 9

    // check each box of the row
    for (let i = 0; i < 9; i++) {
      // if the box has the same value as the value that we want to place
      if (puzzleString[row] === value) {
        return false
      }

      row += 1
    }

    // it is available
    return true
  }

  checkColPlacement(puzzleString, column, value) {
    // 1 -> 0
    // 2 -> 1
    // 3 -> 2
    column -= 1

    // check each box in the column
    for (let i = 0; i < 9; i++) {
      // if the current column has the same value as the one we want to place
      if (puzzleString[column] === value) {
        return false
      }

      column += 9
    }

    // available
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // A -> 0
    // B -> 1
    // C -> 2
    // D -> 3
    // E -> 4
    // F -> 5
    // G -> 6
    row = row.charCodeAt(0) - 65

    // 0 -> 0
    // 1 -> 0
    // 2 -> 0
    // 3 -> 27
    // 4 -> 27
    // 5 -> 27
    // 6 -> 54
    // 7 -> 54
    row = Math.floor(row / 3) * 27

    // 1 -> 0
    // 2 -> 1
    // 3 -> 2
    // 4 -> 3
    // 5 -> 4
    column = column - 1

    // 0 -> 0
    // 1 -> 0
    // 2 -> 0
    // 3 -> 3
    // 4 -> 3
    // 5 -> 3
    // 6 -> 6
    // 7 -> 6
    // 8 -> 6
    column = Math.floor(column / 3) * 3

    let index = row + column

    // check all boxes of region
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleString[index] === value) {
          return false
        }

        index += 1
      }

      index += 6
    }

    return true
  }

  isValid(puzzleString, row, column, value) {
    return (
      this.checkRowPlacement(puzzleString, row, value) &&
      this.checkColPlacement(puzzleString, column, value) &&
      this.checkRegionPlacement(puzzleString, row, column, value)
    )
  }

  findEmpty(puzzleString) {
    for (let i = 0; i < 81; i++) {
      if (puzzleString[i] === '.') {
        let row = String.fromCharCode(65 + Math.floor(i / 9))
        let column = (i % 9) + 1

        return [row, column]
      }
    }

    return null
  }

  solve(puzzleString) {
    let emptyBox = this.findEmpty(puzzleString)

    if (!emptyBox) {
      if (
        puzzleString.split('').filter((character) => /[^0-9.]/.test(character))
          .length !== 0 ||
        puzzleString.length !== 81
      ) {
        return false
      }
      return puzzleString
    }

    let [row, column] = emptyBox

    for (let value = 1; value < 10; value++) {
      if (this.isValid(puzzleString, row, column, value.toString())) {
        let index = (row.charCodeAt(0) - 65) * 9 + (column - 1)
        puzzleString =
          puzzleString.substring(0, index) +
          value +
          puzzleString.substring(index + 1)

        let result = this.solve(puzzleString)

        if (result) {
          return result
        }
      }
    }

    return false
  }
}

module.exports = SudokuSolver
