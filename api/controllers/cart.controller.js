const Joi = require("joi");
const Cart = require("../models/Cart");

const getUserCart = async (req, res) => {
  let user = req.user;
  let carts = await Cart.find({user: user.id}).populate('items.product');

  return res.json({carts: carts});
}

const addToCart = async (req, res) => {
  const schema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    const user = req.user;

    //find the user cart

    let userCart = await Cart.findOne({ _user: user.id });

    if (userCart) {
      //convert to string because mongoose _id is not a string
      const productAlreadyInCart = userCart.items.find(
        (item) => item.product.toString() === value.product
      );
      //if product already in cart then do nothing
      //sum with new quantity

      if (!productAlreadyInCart) {
        await Cart.updateOne({ _user: user.id }, { $push: { items: value } });
        return res.json({
          status: "success",
          message: "Product added to the cart",
        });
      } else {
        return res.json({
          status: "failed",
          message: "Product already in the cart",
        });
      }

      // Cart.updateOne({_user: user.id}, {})
    } else {
      try {
        let cart = new Cart({ user: user.id });

        cart.items = [value];

        await cart.save();

        return res.json({
          status: "success",
          message: "Product added to the cart",
        });
      } catch (er) {
        return res.status(500).json({ message: "Error: " + er.message });
      }
    }
  } else {
    return res
      .status(500)
      .json({ message: "Validation error " + error.message });
  }
};

const removeFromCart = async (req, res) => {
  let { productId } = req.params;
  let user = req.user;
  try {
    await Cart.updateOne(
      { user: user.id },
      { $pull: { items: { product: productId } } }
    );

    res.json({ status: "success", message: "Product removed from cart" });
  } catch (er) {
    return res.status(500).json({ message: "Server error: " + er.message });
  }
};

const updateQuantity = async (req, res) => {
  let { productId } = req.params;
  let user = req.user;
  //type inc, dec, update qunatity by 1

  let { type } = req.body;

  let value = type === "dec" ? -1 : 1;

  try {
    //no decrent system so increment ad negative
    await Cart.updateOne(
      { user: user.id, "items.product": productId },
      { $inc: { "items.$.quantity": value } }
    );

    return res.json({ status: "success", message: "Quantity updated" });
  } catch (er) {
    return res.status(500).json({ message: "error: " + er.message });
  }
};

module.exports = { addToCart, removeFromCart, updateQuantity, getUserCart};
