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

module.exports = { createProductController };