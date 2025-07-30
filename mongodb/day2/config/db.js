const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: "Day-5-express",
})
.then(()=>{
    console.log("----DB CONNECTED-----");
})
.catch((err)=>{
    console.log("DB CONNECTION FAILED ");
    console.log(err.message);
})