Product = require("../models/product");

exports.index = (req, res) => {
  Product.find({})
    .populate("subcategory")
    .exec((err, products) => {
      if (err) res.status(400).send(err);
      else res.json(products);
    });
};

exports.new = (req, res) => {
  var product = new Product();

  product.name = req.body.name ? req.body.name : product.name;
  product.description = req.body.description
    ? req.body.description
    : product.description;
  product.unit = req.body.unit ? req.body.unit : product.unit;
  product.price = req.body.price ? req.body.price : product.price;
  product.subcategory = req.body.subcategory
    ? req.body.subcategory
    : product.subcategory;

  product.save((err) => {
    if (err) res.status(400).send(err);
    else {
      Product.findById(product._id)
        .populate("subcategory")
        .exec((err, product) => {
          if (err) res.status(400).send(err);
          else {
            req.io.emit("PRODUCT_CREATED", { product: product });
            res.json(product);
          }
        });
    }
  });
};

exports.view = (req, res) => {
  Product.findById(req.params.product_id)
    .populate("subcategory")
    .exec((err, product) => {
      if (err) res.status(404).send(err);
      else res.json(product);
    });
};

exports.update = (req, res) => {
  Product.findById(req.params.product_id)
    .populate("subcategory")
    .exec((err, product) => {
      if (err) res.status(400).send(err);
      else {
        product.name = req.body.name ? req.body.name : product.name;
        product.description = req.body.description
          ? req.body.description
          : product.description;
        product.unit = req.body.unit ? req.body.unit : product.unit;
        product.price = req.body.price ? req.body.price : product.price;
        product.subcategory = req.body.subcategory
          ? req.body.subcategory
          : product.subcategory;

        product.save((err) => {
          if (err) res.status(400).send(err);
          else req.io.emit("PRODUCT_UPDATED", { product: product });
        });

        res.json(product);
      }
    });
};

exports.delete = (req, res) => {
  Product.deleteOne({ _id: req.params.product_id }, (err, product) => {
    if (err) res.status(400).send(err);
    else {
      req.io.emit("PRODUCT_DELETED", { product: product });
      res.json({ _id: req.params.product_id });
    }
  });
};

exports.user_products = (req, res) => {
  Product.find({ user: req.params.user_id })
    .populate("subcategory")
    .exec((err, products) => {
      if (err) res.status(400).send(err);
      else res.json(products);
    });
};
