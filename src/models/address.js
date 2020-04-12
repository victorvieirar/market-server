var mongoose = require("mongoose");

var addressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  complement: {
    type: String,
    required: false
  },
  neighborhood: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

var Address = (module.exports = mongoose.model("Address", addressSchema));

module.exports.get = (callback, limit) => {
  Address.find(callback).limit(limit);
};
