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
  var board = new Board({n: n});
  
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(colIndex)) {
        continue;
      } 
      board.togglePiece(rowIndex, colIndex);
    }
  }
  
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var factorial = function (n) {
    if (n === 0) {
      return 1;
    } else if (n === 1) {
      return 1;
    } 
    
    return n * factorial(n - 1);
  };
  
  solutionCount = factorial(n);
    
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n) {

  var keepIterating = function(n) {
    var board = new Board({n: n});
    var numPieces = 0;
    var offsetIndex = arguments[1];
    
    for (var rowIndex = 0; rowIndex < n; rowIndex++) {
      console.log('rowIndex is ' + rowIndex);
      
      var newColIndex = (rowIndex > 0) ? 0 : offsetIndex;
      for (var colIndex = newColIndex; colIndex < n; colIndex++) {
        console.log('colIndex is ' + colIndex);
        board.togglePiece(rowIndex, colIndex);
        if ( 
          !board.hasRowConflictAt(rowIndex) &&
          !board.hasColConflictAt(colIndex) &&
          !board.hasMajorDiagonalConflictAt(colIndex - rowIndex) &&
          !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)
        ) {
          numPieces++;
          continue;
        } 
        board.togglePiece(rowIndex, colIndex);
        
      }

    }
    console.log(JSON.stringify(board.rows()));
    console.log('n is equal to' + n);
    console.log('offsetIndex is equal to' + offsetIndex);
    if (offsetIndex > n - 2) {
      console.log('HAPPY FEET');
      return startFromLastRow(n, 0);
      
    }
    if (numPieces !== n && offsetIndex < n - 1) {
      console.log('offset is ' + offsetIndex);
      offsetIndex++;
      console.log('offset is ' + offsetIndex);
      return keepIterating(n, offsetIndex);
    } else {
      return board;
    }
    
    
    function startFromLastRow (n) {
      
    var board = new Board({n: n});
    var numPieces = 0;
    var offsetIndex = arguments[1];
      
      
      for (var rowIndex = n - 1; rowIndex >= 0; rowIndex--) {
      console.log('rowIndex is ' + rowIndex);
      
      var newColIndex = (rowIndex === n - 1) ? offsetIndex : 0;
      for (var colIndex = newColIndex; colIndex < n; colIndex++) {
        console.log('colIndex is ' + colIndex);
        board.togglePiece(rowIndex, colIndex);
        if ( 
          !board.hasRowConflictAt(rowIndex) &&
          !board.hasColConflictAt(colIndex) &&
          !board.hasMajorDiagonalConflictAt(colIndex - rowIndex) &&
          !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)
        ) {
          numPieces++;
          continue;
        } 
        board.togglePiece(rowIndex, colIndex);
        
      }

    }
    console.log(JSON.stringify(board.rows()));
    console.log('n is equal to' + n);
    console.log('offsetIndex is equal to' + offsetIndex);
    if (numPieces !== n && offsetIndex < n - 1) {
      console.log('offset is ' + offsetIndex);
      offsetIndex++;
      console.log('offset is ' + offsetIndex);
      return startFromLastRow(n, offsetIndex);
    } else {
      return board;
    }
      
      
      
      
    }
    
      
  };
  
  var solutionBoard = keepIterating(n, 0);
  
  //if numPieces !== n, then go through entire machinery again
  //with the tryNextColumn++. Also, reset numPieces = 0. 
  
  var solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
  
//   var columnIterator = 0;
//   var keepIterating = function(n) {
//     var board = new Board({n: n});
//     var numPieces = 0;
    
//     for (var rowIndex = 0; rowIndex < n; rowIndex++) {
//       board = new Board({n: n});
//       for (var colIndex = 0; colIndex < n; colIndex++) {
//         board.togglePiece(rowIndex, colIndex);
//         if ( 
//           !board.hasRowConflictAt(rowIndex) &&
//           !board.hasColConflictAt(colIndex) &&
//           !board.hasMajorDiagonalConflictAt(colIndex - rowIndex) &&
//           !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)
//         ) {
//           numPieces++;
//           continue;
//         } 
//         board.togglePiece(rowIndex, colIndex);
        
//       }
//       if (numPieces === n) {
//         return board;
//       }
//     }
//     console.log('n is equal to' + n);
    
//     if (numPieces !== n) {
//       console.log('num pieces is not equal to n');
//     }
    
//     return board;
//   };
  
//   var solutionBoard = keepIterating(n);
  
//   //if numPieces !== n, then go through entire machinery again
//   //with the tryNextColumn++. Also, reset numPieces = 0. 
  
//   var solution = solutionBoard.rows();

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
