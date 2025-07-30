const express = require("express");
const { createProductController, getAllProductController, UpdateProductController, DeleteProductController } = require("./controllers");
const { createProductValidator, updateProductValidator } = require("./dto");
const productRouter = express.Router();


productRouter.get("/", getAllProductController);
productRouter.post("/", createProductValidator, createProductController);
productRouter.patch("/:productId", updateProductValidator, UpdateProductController);
productRouter.delete("/:productId", DeleteProductController);


module.exports = { productRouter }