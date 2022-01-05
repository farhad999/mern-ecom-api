const Order = require("../models/Order");
const Cart = require("../models/Cart");
const config = require("../configs/app.config");
const User = require("../models/User");

const getOrders = async (req, res) => {
    const user = req.user;

    const orders = await Order.find({user: user.id}).populate("items.product");

    return res.json({orders: orders});
};

const placeOrder = async (req, res) => {
    const user = req.user;

    const dbUser = await User.findById(user.id).populate('carts.product');

    //find current cart of the user

    let cartItems = dbUser.carts;

    let orderItems = cartItems.map((item) => {
        let newItem = {};
        newItem.product = item.product._id;
        newItem.price = item.product.price;
        newItem.quantity = item.quantity;
        return newItem;
    });

    //Calcualte Total Price

    const shippingCharge = parseInt(config.DEFAULT_SHIPPING_CHARGE);

    const totalProductPrice = cartItems.reduce((acc, item) => {
        acc = acc + item.product.price * item.quantity;
        return acc;
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

        await User.updateOne({_id: user.id}, {$set: {carts: []}});
        await order.save();

        return res.json({
            status: "success",
            message: "Order has been placed",
            orderId: order._id,
        });
    } catch (er) {
        return res.status(500).json({message: "Error :" + er.message});
    }
};

const cancelledOrder = async (req, res) => {
    let {id} = req.params;
    try {
        await Order.findOneAndUpdate({_id: id}, {$set: {status: "cancelled"}});
        return res.json({status: 'success', message: 'Order cancelled'});
    } catch (er) {
        return res.status(500).json({message: 'Something went wrong: ' + er.message});
    }

};

const getAllOrders = async (req, res) =>  {
    const orders = await Order.find({}).populate("items.product");
    return res.json({orders})
}

const viewOrder = async (req, res) =>{
    let {id} = req.params;

    const order = await Order.findById(id).populate('items.product')
        .populate('user');

    return res.json({order});

}

module.exports = {
    placeOrder,
    getOrders,
    cancelledOrder,
    getAllOrders,
    viewOrder
};
