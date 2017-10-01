var http = require('http');
var concatStream = require('concat-stream');

var urls = process.argv.slice(2),
    results = [],
    resultsCount = 0;

  // You will need to queue the results and keep track of
  // how many of the URLs have returned their entire
  // contents. Only once you have them all, you can print
  // the data to the console.
  //
  // Counting callbacks is one of the fundamental ways of
  // managing async in Node. Rather than doing it
  // yourself, you may find it more convenient to rely on
  // a third-party library such as


urls.forEach((url, i) => {
  http.get(url, (response) => {
    response.setEncoding('utf8');

    response.pipe(concatStream((data) => {
      results[i] = data;
      resultsCount++;

      if (resultsCount === urls.length) {
        results.forEach((result) => {
          console.log(result);
        });
      }
    }));
  });
});

// var http = require("http");
// var bl = require("bl");
// var results = [];
// var count = 0;
//
// function printResults() {
//   for (var i = 0; i < 3; i++) {
//     console.log(results[i]);
//   }
// }
//
// function httpGet(index) {
//   http.get(process.argv[2 + index], function(response) {
//     response.pipe(
//       bl(function(err, data) {
//         if (err) {
//           return console.error(err);
//         }
//
//         results[index] = data.toString();
//         count++;
//
//         if (count === 3) {
//           printResults();
//         }
//       })
//     );
//   });
// }
//
// for (var i = 0; i < 3; i++) {
//   httpGet(i);
// }
