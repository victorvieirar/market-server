var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  subcategory: {
    type: ObjectId,
    ref: "Subcategory",
    required: true
  }
});

var Product = (module.exports = mongoose.model("Product", productSchema));

module.exports.get = (callback, limit) => {
  Product.find(callback).limit(limit);
};
