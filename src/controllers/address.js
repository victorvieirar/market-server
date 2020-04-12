Address = require("../models/address");

exports.index = (req, res) => {
  Address.find({}).exec((err, addresses) => {
    if (err) res.status(400).send(err);
    else res.json(addresses);
  });
};

exports.new = (req, res) => {
  var address = new Address();

  address.name = req.body.name ? req.body.name : address.name;
  address.street = req.body.street ? req.body.street : address.street;
  address.number = req.body.number ? req.body.number : address.number;
  address.complement = req.body.complement
    ? req.body.complement
    : address.complement;
  address.neighborhood = req.body.neighborhood
    ? req.body.neighborhood
    : address.neighborhood;
  address.cep = req.body.cep ? req.body.cep : address.cep;
  address.city = req.body.city ? req.body.city : address.city;
  address.state = req.body.state ? req.body.state : address.state;

  address.save(err => {
    if (err) res.status(400).send(err);
    else {
      Address.findById(address._id).exec((err, address) => {
        if (err) res.status(400).send(err);
        else res.json(address);
      });
    }
  });
};

exports.view = (req, res) => {
  Address.findById(req.params.address_id).exec((err, address) => {
    if (err) res.status(404).send(err);
    else res.json(address);
  });
};

exports.update = (req, res) => {
  Address.findById(req.params.address_id).exec((err, address) => {
    if (err) res.status(400).send(err);
    else {
      address.name = req.body.name ? req.body.name : address.name;
      address.street = req.body.street ? req.body.street : address.street;
      address.number = req.body.number ? req.body.number : address.number;
      address.complement = req.body.complement
        ? req.body.complement
        : address.complement;
      address.neighborhood = req.body.neighborhood
        ? req.body.neighborhood
        : address.neighborhood;
      address.cep = req.body.cep ? req.body.cep : address.cep;
      address.city = req.body.city ? req.body.city : address.city;
      address.state = req.body.state ? req.body.state : address.state;

      address.save(err => {
        if (err) res.status(400).send(err);
      });

      res.json(address);
    }
  });
};

exports.delete = (req, res) => {
  Address.deleteOne({ _id: req.params.address_id }, (err, address) => {
    if (err) res.status(400).send(err);
    else res.json({ _id: req.params.address_id });
  });
};
