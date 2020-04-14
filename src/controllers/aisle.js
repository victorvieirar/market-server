Aisle = require("../models/aisle");

exports.index = (req, res) => {
  Aisle.find({}).exec((err, aisles) => {
    if (err) res.status(400).send(err);
    else res.json(aisles);
  });
};

exports.new = (req, res) => {
  var aisle = new Aisle();

  aisle.name = req.body.name ? req.body.name : aisle.name;

  aisle.save((err) => {
    if (err) res.status(400).send(err);
    else {
      Aisle.findById(aisle._id).exec((err, aisle) => {
        if (err) res.status(400).send(err);
        else {
          req.io.emit("AISLE_CREATED", { aisle: aisle });
          res.json(aisle);
        }
      });
    }
  });
};

exports.view = (req, res) => {
  Aisle.findById(req.params.aisle_id).exec((err, aisle) => {
    if (err) res.status(404).send(err);
    else res.json(aisle);
  });
};

exports.update = (req, res) => {
  Aisle.findById(req.params.aisle_id).exec((err, aisle) => {
    if (err) res.status(400).send(err);
    else {
      aisle.name = req.body.name ? req.body.name : aisle.name;

      aisle.save((err) => {
        if (err) res.status(400).send(err);
        else req.io.emit("AISLE_UPDATED", { aisle: aisle });
      });

      res.json(aisle);
    }
  });
};

exports.delete = (req, res) => {
  Aisle.deleteOne({ _id: req.params.aisle_id }, (err, aisle) => {
    if (err) res.status(400).send(err);
    else {
      req.io.emit("AISLE_DELETED", { _id: req.params.aisle_id });
      res.json({ _id: req.params.aisle_id });
    }
  });
};
