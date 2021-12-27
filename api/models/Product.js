const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        Type: Number,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        default: null,
    },
    thumbImage: {
        type: String,
    },
    galleryImage: [{
        type: String,
    }
    ],

}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);