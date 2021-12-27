const authRoute = require("./auth.route");
const router = require("express").Router();
const brandRoute = require("./brand.route");
const categoryRoute = require("./category.route");

router.use("/auth", authRoute);

router.use("/brand", brandRoute);

router.use("/category", categoryRoute);

module.exports = router;
