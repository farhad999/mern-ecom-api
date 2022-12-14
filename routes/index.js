const authRoute = require("./auth.route");
const router = require("express").Router();
const brandRoute = require("./brand.route");
const categoryRoute = require("./category.route");
const productRoute = require('./product.route')
const cartRoute = require('./cart.route');
const orderRoute = require('./order.route')

router.use("/auth", authRoute);

router.use("/brands", brandRoute);

router.use("/categories", categoryRoute);

router.use('/products', productRoute);

router.use('/carts', cartRoute);

router.use('/orders', orderRoute);

//mix routes

module.exports = router;
