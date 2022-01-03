const mongoose = require('mongoose');

const {Schema} = mongoose;

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
      type: String,
      unique: true,
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
    description: String,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
