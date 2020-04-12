User = require("../models/user");

exports.index = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) res.status(400).send(err);
    else res.json(users);
  });
};

exports.new = (req, res) => {
  var user = new user();

  user.name = req.body.name ? req.body.name : user.name;

  user.save((err) => {
    if (err) res.status(400).send(err);
    else {
      User.findById(user._id).exec((err, user) => {
        if (err) res.status(400).send(err);
        else {
          req.io.emit("USER_CREATED", { user: user });
          res.json(user);
        }
      });
    }
  });
};

exports.view = (req, res) => {
  User.findById(req.params.user_id).exec((err, user) => {
    if (err) res.status(404).send(err);
    else res.json(user);
  });
};

exports.update = (req, res) => {
  User.findById(req.params.user_id).exec((err, user) => {
    if (err) res.status(400).send(err);
    else {
      user.name = req.body.name ? req.body.name : user.name;

      user.save((err) => {
        if (err) res.status(400).send(err);
        req.io.emit("USER_UPDATED", { user: user });
      });

      res.json(user);
    }
  });
};

exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.user_id }, (err, user) => {
    if (err) res.status(400).send(err);
    else res.json({ _id: req.params.user_id });
  });
};
