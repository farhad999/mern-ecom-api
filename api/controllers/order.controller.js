const Order = require("../models/Order");
const Cart = require("../models/Cart");
const config = require("../configs/app.config");

const getOrders = async (req, res) => {
  const user = req.user;

  const orders = await Order.find({ user: user.id }).populate("items.product");

  return res.json({ orders: orders });
};

const placeOrder = async (req, res) => {
  const user = req.user;

  //find current cart of the user

  let userCart = await Cart.findOne({ user: user.id }).populate(
    "items.product"
  );

  let items = userCart.items;

  let orderItems = items.map((item) => {
    let newItem = {};
    newItem.product = item.product._id;
    newItem.price = item.product.price;
    newItem.quantity = item.quantity;
    return newItem;
  });

  //Calcualte Total Price

  const shippingCharge = parseInt(config.DEFAULT_SHIPPING_CHARGE);

  const totalProductPrice = items.reduce((acc, item) => {
    return (acc = acc + item.product.price * item.quantity);
  }, 0);

  const grandTotal = totalProductPrice + shippingCharge;

  //now store order

  try {
    const order = Order({
      user: user.id,
      items: orderItems,
      shippingCharge,
      total: grandTotal,
    });

    //remove cart now

    await Cart.deleteOne({ user: user.id });
    await order.save();

    return res.json({
      status: "success",
      message: "Order has been placed",
      orderId: order._id,
    });
  } catch (er) {
    session.abortTransaction();
    return res.status(500).json({ message: "Error :" + er.message });
  }
};

const cancelledOrder = async (req, res) => {
  let { id } = req.params;
    try{
        await Order.findOneAndUpdate({ _id: id }, { $set: { status: "cancelled" } });
        return res.json({status: 'success', message: 'Order cancelled'});
    }catch(er){
        return res.status(500).json({message: 'Something went wrong: '+er.message});
    }
  
};

module.exports = {
  placeOrder,
  getOrders,
  cancelledOrder,
};
