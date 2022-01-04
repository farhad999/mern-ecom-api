const Joi = require("joi");
const Cart = require("../models/Cart");
const User = require('../models/User')

const getUserCart = async (req, res) => {
    let user = req.user;
    let dbUser = await User.findById({_id:user.id}).populate('carts.product');
    let carts = dbUser.carts;
    return res.json({items: carts});
}

const addToCart = async (req, res) => {
    const schema = Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().default(1),
    });

    const {value, error} = schema.validate(req.body);

    if (!error) {
        const user = req.user;

        //find the user cart

        const dbUser = await User.findById(user.id);

        let carts = await dbUser.carts;


        //convert to string because mongoose _id is not a string
        const productAlreadyInCart = carts.find(
            (item) => item.product.toString() === value.product
        );
        //if product already in cart then do nothing
        //sum with new quantity

        if (!productAlreadyInCart) {
            await User.updateOne({_id: user.id}, {$push: {carts: value}});
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

    } else {
        return res
            .status(500)
            .json({message: "Validation error " + error.message});
    }
};

const removeFromCart = async (req, res) => {

    let {productId} = req.params;

    let user = req.user;

    try {

        await User.updateOne({_id: user.id}, {$pull: {carts: {_id: productId}}})

        res.json({status: "success", message: "Product removed from cart"});
    } catch (er) {
        return res.status(500).json({message: "Server error: " + er.message});
    }
};

const updateQuantity = async (req, res) => {
    let {productId} = req.params;
    let user = req.user;
    //type inc, dec, update qunatity by 1

    let {type} = req.body;

    let value = type === "dec" ? -1 : 1;

    try {
        //no decrent system so increment ad negative
        await Cart.updateOne(
            {user: user.id, "items.product": productId},
            {$inc: {"items.$.quantity": value}}
        );

        return res.json({status: "success", message: "Quantity updated"});
    } catch (er) {
        return res.status(500).json({message: "error: " + er.message});
    }
};

module.exports = {addToCart, removeFromCart, updateQuantity, getUserCart};
