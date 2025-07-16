const fs = require("fs");


//writing a file

// fs.writeFileSync("./my-file.txt", "Hello Sanjay Boy")
// fs.writeFileSync("./my-file.json", '{"hello" : "world"}')

const res = fs.readFileSync("./my-file.txt", "utf-8");
// file name and how to read the file in what format
console.log(res);

