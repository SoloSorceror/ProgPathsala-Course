const createProductValidator = (req, res, next) => {
    try {
        console.log("-----Inside CreateProductValidator---------");
        const { title, price, description, quantity } = req.body;

        if (quantity && quantity < 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Quantity should be more than 0",
                data: {},
            });
            return;
        }
        if (!price || price < 1) {
            res.status(400).json({
                isSuccess: false,
                message: "Price should be > 1",
                data: {},
            });
            return;
        }
        if (!title || title.length < 2) {
            res.status(400).json({
                isSuccess: false,
                message: "Title length should be >= 2",
                data: {},
            });
            return;
        }
        if (description && description.length <= 5) {
            res.status(400).json({
                isSuccess: false,
                message: "Description is too short....",
                data: {},
            });
            return;
        }

        next(); // this is required right


    } catch (err) {
        console.log("------Error in createProductValidator-----------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
            data: {},
        });
    }
};


const updateProductValidator = (req, res, next) => {
    try {
        console.log("-----Inside updateProductValidator---------");
        const { title, price, description, quantity } = req.body;

        if (quantity && quantity < 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Quantity should be more than 0",
                data: {},
            });
            return;
        }
        if (price && price < 1) {
            res.status(400).json({
                isSuccess: false,
                message: "Price should be > 1",
                data: {},
            });
            return;
        }
        if (title && title.length < 2) {
            res.status(400).json({
                isSuccess: false,
                message: "Title length should be >= 2",
                data: {},
            });
            return;
        }
        if (description && description.length <= 5) {
            res.status(400).json({
                isSuccess: false,
                message: "Description is too short....",
                data: {},
            });
            return;
        }

        next(); // this is required right


    } catch (err) {
        console.log("------Error in updateProductValidator-----------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
            data: {},
        });
    }
};



module.exports = { createProductValidator, updateProductValidator };