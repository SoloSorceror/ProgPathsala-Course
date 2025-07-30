const createProductValidator = (req, res, next) => {
    try {
        console.log("-----Inside CreateProductValidator---------");
        const { title, price, description, quantity } = req.body;

        if (quantity && quantity < 0) {
            req.status(400).json({
                isSuccess: false,
                message: "Quantity should be more than 0",
                data: {},
            });
            return;
        }
        if (!price || price < 1) {
            req.status(400).json({
                isSuccess: false,
                message: "Price should be > 1",
                data: {},
            });
            return;
        }
        if (title || title.length <= 2) {
            req.status(400).json({
                isSuccess: false,
                message: "Title length should be >= 2",
                data: {},
            });
            return;
        }
        if (description && description.length <= 5) {
            req.status(400).json({
                isSuccess: false,
                message: "Description is too short....",
                data: {},
            });
            return;
        }


    } catch (err) {
        console.log("------Error in createProductValidator-----------", err.message);
        req.status(500).json({
            isSuccess: false,
            message: "Internal server error",
            data: {},
        });
    }
};

module.exports = { createProductValidator };