var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var orderSchema = mongoose.Schema({
  products: [
    {
      type: ObjectId,
      ref: "Product",
      required: true
    }
  ],
  paymentMethod: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  address: {
    type: ObjectId,
    ref: "Address",
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  coupon: {
    type: ObjectId,
    ref: "Coupon"
  },
  shippingFare: {
    type: Number,
    required: true,
    default: 0.0
  }
});

var Order = (module.exports = mongoose.model("Order", orderSchema));

module.exports.get = (callback, limit) => {
  Order.find(callback).limit(limit);
};
