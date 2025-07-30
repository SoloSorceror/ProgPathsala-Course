const express = require("express");
const { createProductController, getAllProductController, UpdateProductController, DeleteProductController, listProductControllers } = require("./controllers");
const { createProductValidator, updateProductValidator } = require("./dto");
const productRouter = express.Router();


productRouter.get("/all", getAllProductController);
productRouter.get("/", listProductControllers);
productRouter.post("/", createProductValidator, createProductController);
productRouter.patch("/:productId", updateProductValidator, UpdateProductController);
productRouter.delete("/:productId", DeleteProductController);


module.exports = { productRouter }