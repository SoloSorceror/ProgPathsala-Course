const { default: mongoose } = require("mongoose");


mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: "learning-mongoose"

}
).then(()=>{
    console.log("-----DB connected Successfully----------")
})
.catch((err)=>{
    console.log("----Couldn't connect----");
    console.log(err.message);
    console.log("------------------------");
});
