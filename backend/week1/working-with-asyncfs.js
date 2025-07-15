const fs = require("fs");

console.log("start");

const startTime1 = performance.now();

fs.readFile("./my-file.txt","utf-8", (err,data)=>{
    if(err){
        console.log("Cannot read file --> ", err.message);
    } else{
        console.log("data --> ", data);
    }
});

const endTime2 = performance.now();
console.log(endTime2-startTime1);

console.log("end");

// check the async nature here by running the code
