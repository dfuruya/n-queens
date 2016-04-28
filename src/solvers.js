/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; 

  // create a helper function, pass in array
  var solveNRooks = function(matrix, row) {
    // create an array to represent board
    var checkBoard = new Board(matrix);
    // iterate through each column (of a row)
    for (var col = 0; col < n; col++) {
      checkBoard.togglePiece(row, col);
      // base case: if row and col indices is n
      if (row === n - 1 && col === n - 1) {
        var arr = [];
        for (var i = 0; i < n; i++) {
          arr.push(checkBoard.rows()[i].slice());
        }
        // save board to solution array
        solution.push(arr);
        return solution;
      }
      // if no conflicts
      if (!checkBoard.hasAnyRooksConflicts() && n > 1 && row < n - 1) {
        // recurse with board and next row
        solveNRooks(checkBoard.rows(), row + 1); 
      }
      // toggle rook off
      checkBoard.togglePiece(row, col);
    }
  };

  var board = new Board({'n': n});
  solveNRooks(board.rows(), 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution[0]));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  var solutionCount = 0; 

  // create a helper function, pass in array
  var solveNRooks = function(matrix, row) {
    // create an array to represent board
    var checkBoard = new Board(matrix);
    // iterate through each column (of a row)
    for (var col = 0; col < n; col++) {
      checkBoard.togglePiece(row, col);
      // base case: if row and col indices is n
      if (row === n - 1 && col === n - 1) {
        // save board to solution array
        solutionCount++;
        // return solution;
      }
      // if no conflicts
      if (!checkBoard.hasAnyRooksConflicts() && n > 1 && row < n - 1) {
        // recurse with board and next row
        solveNRooks(checkBoard.rows(), row + 1); 
      }
      // toggle rook off
      checkBoard.togglePiece(row, col);
    }
  };

  var board = new Board({'n': n});
  solveNRooks(board.rows(), 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  // create a helper function, pass in array
  var solveNQueens = function(matrix, row, count) {
    // create an array to represent board
    var checkBoard = new Board(matrix);
    // create skip boolean, set to true
    var skip = true;
    // iterate through each column (of a row)
    for (var col = 0; col < n; col++) {
      checkBoard.togglePiece(row, col);
      // if no conflicts
      if (!checkBoard.hasAnyQueensConflicts()) {
        // set skip flag to false
        skip = false;
        // recurse with board and next row
        if (row + 1 < n) {
          solveNQueens(checkBoard.rows(), row + 1, count + 1);         
        }
      }
      // base case: if row and col indices is n
      //also check that number of queens is equal to n
      if (!checkBoard.hasAnyQueensConflicts() && count === n) {
        //if so, push to solution 
        var arr = [];
        for (var i = 0; i < n; i++) {
          arr.push(checkBoard.rows()[i].slice());
        }
        // save board to solution array
        solution.push(arr);
        return solution;
      }
      // toggle queen off
      checkBoard.togglePiece(row, col);
      // if at last column and skip is still true,
      // and the next row is in bounds,
      if (skip && row + 1 < n && col === n - 1) {
        solveNQueens(checkBoard.rows(), row + 1, count); 
      }
    }
  };

  var board = new Board({'n': n});
  solveNQueens(board.rows(), 0, 1);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution = solution[0] || new Board({'n': n}).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    console.log('n is ', n);
  var solutionCount = 0; //fixme
  // create a helper function, pass in array
  var solveNQueens = function(matrix, row, count) {
    // create an array to represent board
    var checkBoard = new Board(matrix);
    // create skip boolean, set to true
    var skip = true;
    // iterate through each column (of a row)
    for (var col = 0; col < n; col++) {
      checkBoard.togglePiece(row, col);
      // if no conflicts
      if (!checkBoard.hasAnyQueensConflicts()) {
        // set skip flag to false
        skip = false;
        // recurse with board and next row
        if (row + 1 < n) {
          solveNQueens(checkBoard.rows(), row + 1, count + 1);         
        }
      }
      // base case: if row and col indices is n
      //also check that number of queens is equal to n
      if (!checkBoard.hasAnyQueensConflicts() && count === n) {
        //if so, push to solution 
        // save board to solution array
        solutionCount++;
      }
      // toggle queen off
      checkBoard.togglePiece(row, col);
      // if at last column and skip is still true,
      // and the next row is in bounds,
      if (skip && row + 1 < n && col === n - 1) {
        solveNQueens(checkBoard.rows(), row + 1, count); 
      }
    }
  };
  var board = new Board({'n': n});
  solveNQueens(board.rows(), 0, 1);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
