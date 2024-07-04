'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {
    // get puzzle coordinate and value information from the body
    const { puzzle, coordinate, value } = req.body

    // if expected values are missing return an error message
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' })
    }

    // if there are other than numbers and dot characters in the puzzle return an error
    if (
      puzzle.split('').filter((character) => /[^0-9.]/.test(character))
        .length !== 0
    ) {
      return res.json({ error: 'Invalid characters in puzzle' })
    }

    // if the puzzle is not in 9x9 format
    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
    }

    // split the row and the column from coordiante
    let [row, column] = coordinate.split('')

    // if the value is not in the range 1 to 9
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' })
    }

    // if row and column values are not in expected values
    if (
      !'ABCDEFGHI'.includes(row) ||
      !'123456789'.includes(column) ||
      coordinate.length !== 2
    ) {
      return res.json({ error: 'Invalid coordinate' })
    }

    column = parseInt(column)

    if (!solver.checkIsThereADot(puzzle, row, column)) {
      if (puzzle[(row.charCodeAt(0) - 65) * 9 + (column - 1)] === value) {
        return res.json({ valid: true })
      }
    }

    const rowAvailable = solver.checkRowPlacement(puzzle, row, value)
    const columnAvailable = solver.checkColPlacement(puzzle, column, value)
    const regionAvailable = solver.checkRegionPlacement(
      puzzle,
      row,
      column,
      value
    )

    let conflict = []

    if (!rowAvailable) {
      conflict.push('row')
    }

    if (!columnAvailable) {
      conflict.push('column')
    }

    if (!regionAvailable) {
      conflict.push('region')
    }

    if (conflict.length === 0) {
      return res.json({ valid: true })
    } else {
      return res.json({ valid: false, conflict })
    }
  })

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body

    if (!puzzle) {
      return res.json({ error: 'Required field missing' })
    }

    if (
      puzzle.split('').filter((character) => /[^0-9.]/.test(character))
        .length !== 0
    ) {
      return res.json({ error: 'Invalid characters in puzzle' })
    }

    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
    }

    const solution = solver.solve(puzzle)

    if (solution) {
      return res.json({ solution })
    } else {
      return res.json({ error: 'Puzzle cannot be solved' })
    }
  })
}
