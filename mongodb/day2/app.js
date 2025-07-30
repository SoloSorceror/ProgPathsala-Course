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

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            isSuccess: false,
            message: "Malformed JSON in request body",
            data: {},
        });
    }
    next(err); // pass other errors
});


app.listen(PORT, () => {
    console.log("---Server Started---");
})

