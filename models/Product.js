const mongoose = require("mongoose");
const {nanoid} = require('nanoid')

const productSchema = mongoose.Schema(
    {
        sku: {
            type: String,
            required: true,
            unique: true,
            default: nanoid(6),
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        offerPrice: {
          type: Number,
        },
        slug: {
          type: String,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            default: null,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        stocks: {
            required: true,
            type: Number,
            default: 0,
        },
        thumbImage: {
            type: String,
        },
        galleryImage: [
            {
                type: String,
            },
        ],
    },
    {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
