const http = require("http");
const fsPromises = require("fs/promises");



const server = http.createServer( async (req,res)=>{
    console.log("->", req.method,req.url,new Date());

    if(req.url=="/"){
        const data = await fsPromises.readFile("./pages/homePage.html", "utf-8");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(data);
    }
    else{
        const data = await fsPromises.readFile("./pages/notFoundPage.html", "utf-8");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(data);
    }
});

server.listen(3900, ()=>{
    console.log("------Server Started------------");
})