function unroll(squareArray) {
    let result = [];
    while (squareArray.length > 0) {
      // Get the first row
      result = result.concat(squareArray.shift());
  
      // Get the last element of each remaining row
      for (let i = 0; i < squareArray.length; i++) {
        result.push(squareArray[i].pop());
      }
  
      // Get the last row, in reverse order
      if (squareArray.length > 0) {
        result = result.concat(squareArray.pop().reverse());
      }
  
      // Get the first element of each remaining row, from bottom to top
      for (let i = squareArray.length - 1; i >= 0; i--) {
        result.push(squareArray[i].shift());
      }
    }
    return result;
  }
  
  module.exports = unroll;
  