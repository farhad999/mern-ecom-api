const mongoose = require("mongoose");

const addressSchema = {}

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
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
    },
    {timestamps: true}
);

const User = mongoose.model("user", userSchema);

module.exports = User;
