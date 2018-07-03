// https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfilesync_path_options
var fs = require('fs');

// Sync 방식
console.log(1);
var data = fs.readFileSync('data.txt', { enconding:'utf8' });
console.log(data);

// Async 방식
console.log(2);
fs.readFile('data.txt', { enconding:'utf8' }, function(err, data) {
  console.log(3);
  console.log(data);
})
console.log(4);
