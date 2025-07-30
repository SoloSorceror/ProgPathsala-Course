const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../../../models/productSchema");

const createProductController = async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await ProductModel.create(data);

        res.status(200);
        res.json({
            isSuccess: true,
            message: "Product Created",
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        console.log("----Error in createProductController------", err.message);
        console.log(err.name);
        console.log(err.code);

        if (err.name == "ValidationError" || err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: `Gandu Client  ${err.message} `,
                data: {}
            });
            return;
        }
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }


};

const getAllProductController = async (req, res) => {
    try {
        console.log("----Inside getAllProductController----");

        const result = await ProductModel.find();
        res.status(200).json({
            isSuccess: true,
            message: "Product List",
            data: {
                products: result,
            },
        });

    } catch (err) {
        console.log("----Error in getAllProductController------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}

// Update

const UpdateProductController = async (req, res) => {
    try {
        console.log("-----Inside UpdateProductController------------");
        const data = req.body;
        const { productId } = req.params;


        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid product ID format",
                data: {},
            });
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, data, {
            new: true,
            runValidators: true,
        }).lean(); // .lean returns a javascript objects rather than mongo db object increasing performance

        if (!updatedProduct) {
            return res.status(404).json({
                isSuccess: false,
                message: "Id doesn't match",
                data: {}
            })
        }
        res.status(200).json({
            isSuccess: true,
            message: "Product Updated",
            data: {
                product: updatedProduct,
            },
        });

    } catch (err) {
        console.log("----Error in updateProductController------", err.message);
        console.log(err.name);
        console.log(err.code);

        if (err.name == "ValidationError" || err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: ` Client Error:  ${err.message} `,
                data: {}
            });
            return;
        }
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}

const DeleteProductController = async (req, res) => {
    try {
        console.log("-----Inside DeleteProductController------------");
        const { productId } = req.params;


        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid product ID format",
                data: {},
            });
        }

        const DeletedProduct = await ProductModel.findByIdAndDelete(productId);

        // .lean returns a javascript objects rather than mongo db object increasing performance

        if (!DeletedProduct) {
            return res.status(404).json({
                isSuccess: false,
                message: "Id doesn't match",
                data: {}
            })
        }
        res.status(204).json({
            isSuccess: true,
            message: "Product Deleted",
            data: {
                product: DeletedProduct,
            },
        });

    } catch (err) {
        console.log("----Error in updateProductController------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}



module.exports = { createProductController, getAllProductController, UpdateProductController, DeleteProductController };