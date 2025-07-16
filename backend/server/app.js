const http = require("node:http");

const server = http.createServer((req,res)=>{
    // req and res are request and response
    console.log("Hello");
    res.writeHead(200, {"content-type": "text/js"})

    res.end("Hello Man we are online "); // your response can be of multiple forms text json etc
    
});

server.listen(3900, ()=>{
    console.log("----------------- We are online -----------------------");
}) // choose any free port from 1000 to 9999

//http://localhost:3900
// after running this hello will be printed in the console
