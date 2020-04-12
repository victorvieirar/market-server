var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var subcategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  aisle: {
    type: ObjectId,
    ref: "Aisle",
    required: true
  }
});

var Subcategory = (module.exports = mongoose.model(
  "Subcategory",
  subcategorySchema
));

module.exports.get = (callback, limit) => {
  Subcategory.find(callback).limit(limit);
};
