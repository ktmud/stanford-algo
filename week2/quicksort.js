var support = require('../support');

support.asArray(function(data) {
  // the first item as the pivot
  console.log(countQuickSort(data, function(arr, left, right) {
    return left;
  }));
  //// the last item as the pivot
  console.log(countQuickSort(data, function(arr, left, right) {
    return right;
  }));
  // "median-of-three" pivot rule
  console.log(countQuickSort(data, function(arr, left, right) {
    var mid = left + ((right-left) >> 1)
    if (isMedian(arr, mid, left, right)) {
      return mid;
    } else if (isMedian(arr, left, mid, right)) {
      return left;
    } else {
      return right;
    }
  }));
});


function isMedian(arr, b, a, c) {
  return (arr[a] < arr[b] && arr[b] < arr[c]) || (arr[c] < arr[b] && arr[b] < arr[a])
}

function countQuickSort(arr, getPivot) {
  var count = 0;

  function quickSort(arr) {
    var n = arr.length;
    if (n < 2) return arr;

    var pivot = getPivot(arr, 0, n - 1);
    var left = [];
    var center = [];
    var right = [];
    var ref = arr[pivot];

    for (var i = 0; i < n; i++) {
      if (arr[i] < ref) {
        left.push(arr[i]);
      } else if (arr[i] > ref) {
        right.unshift(arr[i]);
      } else {
        center.push(arr[i]);
      }
    }

    // count comparisions we made as requested by the assignment
    count += n - 1;

    return quickSort(left).concat(center, quickSort(right));
  }

  function swap(arr, a, b) {
    var tmp = arr[b];
    arr[b] = arr[a];
    arr[a] = tmp;
  }

  function quickSortInPlace(arr, left, right) {
    var n = right - left;
    if (n < 1) return;

    count += n;

    // partition
    var pivot = getPivot(arr, left, right);

    var p = arr[pivot];
    // before loop, make sure the first item is always the pivot value
    if (pivot !== left) {
      swap(arr, left, pivot);
    }
    var i = left + 1; // the partition point
    for (var j = left + 1; j <= right + 1; j++) {
      if (arr[j] < p) {
        swap(arr, i, j);
        i++;
      }
    }
    swap(arr, left, i - 1);

    // sort left partition
    quickSortInPlace(arr, left, i - 2);
    // sort right partition
    quickSortInPlace(arr, i, right);
  }

  //quickSort(arr);
  //console.log(quickSort(arr));
  quickSortInPlace(arr.slice(), 0, arr.length - 1);

  return count;
}

