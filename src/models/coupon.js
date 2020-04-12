var mongoose = require("mongoose");

var couponScheme = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true
  }
});

var Coupon = (module.exports = mongoose.model("Coupon", couponSchema));

module.exports.get = (callback, limit) => {
  Coupon.find(callback).limit(limit);
};
