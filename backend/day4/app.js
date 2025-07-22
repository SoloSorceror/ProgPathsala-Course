const http = require("http");
const fsPromises = require("fs/promises");

const server = http.createServer( async (req,res) =>{

    try{
        console.log("->", Object.keys(req));
        
        if(req.url === "/"){
            const data = await fsPromises.readFile("./homePage.html", "utf-8" );
            res.writeHead(200, {"content-type":"text/html"})
            res.end(data);
        }else if(req.url === "/homePage.js"){
            const data = await fsPromises.readFile("./homePage.js", "utf-8" );
            res.writeHead(200, {"content-type":"text/javascript"})
            res.end(data);
        }
        
        else if(req.url === "/about"){
            const data = await fsPromises.readFile("./about.html", "utf-8" );
            res.writeHead(200, {"content-type":"text/html"})
            res.end(data);
        } else{
            const data = await fsPromises.readFile("./pageNotFound.html", "utf-8" );
            res.writeHead(200, {"content-type":"text/html"})
            res.end(data);
        }
    } catch(err){
        res.writeHead(200, {"content-type":"text/html"});
        res.end("Something Went Wrong!! Try Again... ");
    }
    
});

server.listen(3900, ()=>{
    console.log("----------Server Started-------");
})