require("dotenv").config();
require("./config/db");


const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/users/routes");
const app = express();

const PORT = process.env.PORT || 3900

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", apiRouter);

app.listen(PORT,()=>{
    console.log("---Server Started---");
})

