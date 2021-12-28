const authRoute = require("./auth.route");
const router = require("express").Router();
const brandRoute = require("./brand.route");
const categoryRoute = require("./category.route");
const productRoute = require('./product.route')
const cartRoute = require('./cart.route');

router.use("/auth", authRoute);

router.use("/brand", brandRoute);

router.use("/category", categoryRoute);

router.use('/products', productRoute);

router.use('/carts', cartRoute);

module.exports = router;
