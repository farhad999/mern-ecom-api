const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address:
            {
                phone: String,
                address: String,
            },
        role: {
            type: String,
            default: "customer",
        },
        carts: [{
            product: {type:  mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: {
                type: Number,
                default: 1,
            }
        }]
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
