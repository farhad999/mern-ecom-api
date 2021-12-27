const mongoose = require('mongoose');

const {Schema} = mongoose;

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        default: null,
    },
    child: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    }],
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            default: null,
        }
    ]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;