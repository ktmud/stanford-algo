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
});

exports.asArray = function(callback) {

  process.stdin.setEncoding('utf8');

  process.stdin.on('end', function() {
    process.nextTick(function() {
      callback(data.slice());
    });
  });

};
