const chai = require('chai')
const assert = chai.assert

const SudokuSolver = require('../controllers/sudoku-solver.js')
let solver = new SudokuSolver()
let validPuzzle =
  '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    assert.equal(
      solver.solve(
        '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
      ),
      827549163531672894649831527496157382218396475753284916962415738185763249374928651
    )
    done()
  })
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
    assert.equal(
      solver.solve(
        '..?..5.1.85.4....24!2......1...69.$3.9.....6.6ğ.71...9......1945....4.37.4.3..6..'
      ),
      false
    )
    done()
  })
  test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
    assert.equal(
      solver.solve(
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.322222222222222222222227.4.3..6..'
      ),
      false
    )
    done()
  })
  test('Logic handles a valid row placement', (done) => {
    assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '2'), true)
    done()
  })
  test('Logic handles an invalid row placement', (done) => {
    assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '9'), false)
    done()
  })
  test('Logic handles a valid column placement', (done) => {
    assert.equal(solver.checkColPlacement(validPuzzle, 2, '7'), true)
    done()
  })
  test('Logic handles an invalid column placement', (done) => {
    assert.equal(solver.checkColPlacement(validPuzzle, 7, '6'), false)
    done()
  })
  test('Logic handles a valid region (3x3 grid) placement', (done) => {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 'E', 7, '2'), true)
    done()
  })
  test('Logic handles an invalid region (3x3 grid) placement', (done) => {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 'G', 3, '4'), false)
    done()
  })
  test('Valid puzzle strings pass the solver', (done) => {
    assert.equal(
      solver.solve(validPuzzle),
      769235418851496372432178956174569283395842761628713549283657194516924837947381625
    )
    done()
  })
  test('Invalid puzzle strings fail the solver', (done) => {
    assert.equal(
      solver.solve(
        '..1..5.1.85.4....2472......1...39.83.9.....6.61.71...9......1945....4.37.4.3..6..'
      ),
      false
    )
    done()
  })
  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    assert.equal(
      solver.solve(
        '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
      ),
      218396745753284196496157832531672984649831257827549613962415378185763429374928561
    )
    done()
  })
})
