const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema(
  {
    pay: {
      type: Array,
    },
    userId: {
      type: String,
      required: true,
    },
    
    products: {
      type: [productSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel;