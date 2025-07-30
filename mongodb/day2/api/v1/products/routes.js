const express = require("express");
const { createProductController } = require("./controllers");
const { createProductValidator } = require("./dto");
const productRouter = express.Router();


productRouter.post("/", createProductController, createProductValidator);

module.exports = { productRouter }