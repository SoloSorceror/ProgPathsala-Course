const os = require("os")
const CPU_COUNT = os.cpus().length;

// console.log(os.cpus());
console.log(CPU_COUNT);
console.log(os.platform());
console.log(os.totalmem());