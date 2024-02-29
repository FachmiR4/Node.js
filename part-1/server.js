// you should already know
//  HTML,CSS, and javascript
// possibly experience with other libraries and frameworks

// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in browser (backend not frontend)
// 2) The console is the terminal window
console.log('hello world');
const { log } = require('console');
// 3) global object instead of window object
// console.log(global);
// 4) has common core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) missing some js APIs like fetch

const os = require('os');
const path = require('path');
// const math = require('./math');
const { add, subtract, multiply, dived } = require('./math')

console.log(add(2, 4));
console.log(subtract(2, 4));
console.log(multiply(2, 4));
console.log(dived(2, 4));


console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.basename(__filename)); // --> nama asli file
console.log(path.dirname(__filename)); // nama directory penympanan file
console.log(path.extname(__filename)); // extention nama file

console.log(path.parse(__filename)); 



// code terminal
// node --> version node.js
// Ctrl + c or Ctrl + d --> for exit in code
// node name_file.js --> running the code

