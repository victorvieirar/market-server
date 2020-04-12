Order = require("../models/order");

exports.index = (req, res) => {
  Order.find({})
    .populate("products")
    .populate("address")
    .populate("user")
    .populate("coupon")
    .exec((err, orders) => {
      if (err) res.status(400).send(err);
      else res.json(orders);
    });
};

exports.new = (req, res) => {
  var order = new Order();

  order.products = req.body.products ? req.body.products : order.products;
  order.paymentMethod = req.body.paymentMethod
    ? req.body.paymentMethod
    : order.paymentMethod;
  order.user = req.body.user ? req.body.user : order.user;
  order.address = req.body.address ? req.body.address : order.address;
  order.cost = req.body.cost ? req.body.cost : order.cost;
  order.coupon = req.body.coupon ? req.body.coupon : order.coupon;
  order.shippingFare = req.body.shippingFare
    ? req.body.shippingFare
    : order.shippingFare;

  order.save((err) => {
    if (err) res.status(400).send(err);
    else {
      Order.findById(order._id)
        .populate("products")
        .populate("address")
        .populate("user")
        .populate("coupon")
        .exec((err, order) => {
          if (err) res.status(400).send(err);
          else {
            req.io.emit("ORDER_CREATED", { order: order });
            res.json(order);
          }
        });
    }
  });
};

exports.view = (req, res) => {
  Order.findById(req.params.order_id)
    .populate("products")
    .populate("address")
    .populate("user")
    .populate("coupon")
    .exec((err, order) => {
      if (err) res.status(404).send(err);
      else res.json(order);
    });
};

exports.update = (req, res) => {
  Order.findById(req.params.order_id)
    .populate("products")
    .populate("address")
    .populate("user")
    .populate("coupon")
    .exec((err, order) => {
      if (err) res.status(400).send(err);
      else {
        order.products = req.body.products ? req.body.products : order.products;
        order.paymentMethod = req.body.paymentMethod
          ? req.body.paymentMethod
          : order.paymentMethod;
        order.user = req.body.user ? req.body.user : order.user;
        order.address = req.body.address ? req.body.address : order.address;
        order.cost = req.body.cost ? req.body.cost : order.cost;
        order.coupon = req.body.coupon ? req.body.coupon : order.coupon;
        order.shippingFare = req.body.shippingFare
          ? req.body.shippingFare
          : order.shippingFare;

        order.save((err) => {
          if (err) res.status(400).send(err);
          else req.io.emit("ORDER_UPDATED", { order: order });
        });

        res.json(order);
      }
    });
};

exports.delete = (req, res) => {
  Order.deleteOne({ _id: req.params.order_id }, (err, order) => {
    if (err) res.status(400).send(err);
    else {
      req.io.emit("ORDER_DELETED", { order: order });
      res.json({ _id: req.params.order_id });
    }
  });
};

exports.user_orders = (req, res) => {
  Order.find({ user: req.params.user_id })
    .populate("products")
    .populate("address")
    .populate("user")
    .populate("coupon")
    .exec((err, orders) => {
      if (err) res.status(400).send(err);
      else res.json(orders);
    });
};
