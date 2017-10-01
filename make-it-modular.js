var callback = require('./filter-dir');

var dirPath = process.argv[2];
var extension = process.argv[3];

callback(dirPath, extension, (err, list) => {
  if (err) {
    console.log('An error happened when reading ' + dirPath);
    return err;
  }

  list.forEach((filename) => {
    console.log(filename);
  });
});
