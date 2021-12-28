const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        price: Number,
        quantity: Number,
      },
    ],
    shippingCharge: Number,
    total: {
      type: Number,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
