const fsPromises = require("fs/promises");

console.log("Start");

const main = async() => {
    const data = await fsPromises.readFile("./my-file.txt", "utf-8");
    console.log(data);
};
main();

console.log("End");