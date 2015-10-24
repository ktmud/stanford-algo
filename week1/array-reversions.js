process.stdin.setEncoding('utf8');

var data = '';
//var arr = [];

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    // Cannot cacat like this, because each chunk doesn't always end at the new line char,
    // some chunks may break in the middle of a line, causing a number be splitted into two numbers.
    //arr = arr.concat(chunk.split(/\s+/).map(function(item, i) {
      //return Number(item)
    //}));
    data += chunk;
  }
});
process.stdin.on('end', function() {
  // convert to Array
  data = data.trim().split(/\s+/).map(function(item, i) {
    return Number(item)
  });
  console.log(count(data.slice()));
  //console.log(countBrutal(data.slice()));
});

function count(arr, len) {
  var n = arr.length;
  if (n < 2) return 0;
  var mid = Math.floor((n + 1)/2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);
  return count(left) + count(right) + mergeAndCount(arr, left, right);
}

function mergeAndCount(arr, left, right) {
  var i = 0, j = 0, count = 0;
  while (i < left.length || j < right.length) {
    if (i === left.length) {
      arr[i+j] = right[j];
      j++;
    } else if (j === right.length) {
      arr[i+j] = left[i];
      i++;
    } else if (left[i] <= right[j]) {
      arr[i+j] = left[i];
      i++;
    } else {
      arr[i+j] = right[j];
      count += left.length - i;
      j++;
    }
  }
  return count;
}


function countBrutal(data) {
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    for (var j = i+1; j < data.length; j++) {
      if (data[i] > data[j]) {
        count += 1;
      }
    }
  }
  return count;
}

