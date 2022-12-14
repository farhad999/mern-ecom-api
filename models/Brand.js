const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: null,
    }
}, {timestamps: true});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
