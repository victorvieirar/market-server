Subcategory = require("../models/subcategory");

exports.index = (req, res) => {
  Subcategory.find({})
    .populate("aisle")
    .exec((err, subcategories) => {
      if (err) res.status(400).send(err);
      else res.json(subcategories);
    });
};

exports.new = (req, res) => {
  var subcategory = new Subcategory();

  subcategory.name = req.body.name ? req.body.name : subcategory.name;
  subcategory.aisle = req.body.aisle ? req.body.aisle : subcategory.aisle;

  subcategory.save((err) => {
    if (err) res.status(400).send(err);
    else {
      Subcategory.findById(subcategory._id)
        .populate("aisle")
        .exec((err, subcategory) => {
          if (err) res.status(400).send(err);
          else {
            req.io.emit("SUBCATEGORY_CREATED", { subcategory: subcategory });
            res.json(subcategory);
          }
        });
    }
  });
};

exports.view = (req, res) => {
  Subcategory.findById(req.params.subcategory_id)
    .populate("aisle")
    .exec((err, subcategory) => {
      if (err) res.status(404).send(err);
      else res.json(subcategory);
    });
};

exports.update = (req, res) => {
  Subcategory.findById(req.params.subcategory_id)
    .populate("aisle")
    .exec((err, subcategory) => {
      if (err) res.status(400).send(err);
      else {
        subcategory.name = req.body.name ? req.body.name : subcategory.name;
        subcategory.aisle = req.body.aisle ? req.body.aisle : subcategory.aisle;

        subcategory.save((err) => {
          if (err) res.status(400).send(err);
          else req.io.emit("SUBCATEGORY UPDATED", { subcategory: subcategory });
        });

        res.json(subcategory);
      }
    });
};

exports.delete = (req, res) => {
  Subcategory.deleteOne(
    { _id: req.params.subcategory_id },
    (err, subcategory) => {
      if (err) res.status(400).send(err);
      else {
        req.io.emit("SUBCATEGORY_DELETED", { subcategory: subcategory });
        res.json({ _id: req.params.subcategory_id });
      }
    }
  );
};
