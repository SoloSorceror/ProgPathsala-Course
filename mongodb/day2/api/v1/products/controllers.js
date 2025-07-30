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

const listProductControllers = async (req, res) => {
    try {
        console.log("----Inside listProductControllers----");
        const { limit, page, select = "title price quantity", q = "" } = req.query; // i have set default for select here ok

        const selectedItems = select.split(",").join(" ");
        const searchRegx = new RegExp(q, "ig"); // i means case insensitive and g means global

        let limitNum = parseInt(limit);
        if (limitNum <= 0 || Number.isNaN(limitNum)) {
            limitNum = 4;
        }
        let pageNum = parseInt(page);
        if (pageNum <= 0 || Number.isNaN(pageNum)) {
            pageNum = 1;
        }

        const skipNum = (pageNum - 1) * limitNum;

        const query = ProductModel.find();
        //limit the number of items
        query.skip(skipNum);
        query.limit(limitNum);
        query.select(selectedItems);
        // query.where("title", searchRegx); // if i use this 2 times it will be treated as a or and will return by checking in both like say description so to use or
        query.or([{ title: searchRegx }, { description: searchRegx }]);

        const products = await query;

        res.status(200).json({
            isSuccess: true,
            message: "Product List",
            data: {
                products,
                skip: skipNum,
                limit: Math.min(limitNum, products.length)
            },
        });

    } catch (err) {
        console.log("----Error in listProductControllers------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}


module.exports = { createProductController, getAllProductController, UpdateProductController, DeleteProductController, listProductControllers };