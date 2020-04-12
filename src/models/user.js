var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  addresses: [
    {
      type: ObjectId
    }
  ],
  orders: [
    {
      type: ObjectID
    }
  ]
});

var User = (module.exports = mongoose.model("User", userSchema));

module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
