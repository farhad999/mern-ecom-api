const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.put("/:productId", auth, cartController.updateQuantity);

router.delete("/:productId", auth, cartController.removeFromCart);

router.post("/add", auth, cartController.addToCart);

router.get("/", auth, cartController.getUserCart);

module.exports = router;
