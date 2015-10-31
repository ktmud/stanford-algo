/**
 * The Matrix:
 *
 */

// the Matrix
var a = [[1,2],[3,4]];
var b = [[5,6],[7,8]];

function matrixMultiplicationSimple(a, b) {
  var i = 0, j = 0;
  var output = [];
  while (i < a.length) {
    output[i] = [];
    j = 0;
    while (j < a[i].length) {
      output[i][j] = output[i][j] || 0;
      k = 0;
      while (k < b.length) {
        output[i][j] += a[i][k] * b[k][j];
        k++;
      }
      j++;
    }
    i++;
  }
  return output;
}


console.log(matrixMultiplicationSimple(a, b));
