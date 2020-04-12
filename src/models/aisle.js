var mongoose = require("mongoose");

var aisleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

var Aisle = (module.exports = mongoose.model("Aisle", aisleSchema));

module.exports.get = (callback, limit) => {
  Aisle.find(callback).limit(limit);
};
