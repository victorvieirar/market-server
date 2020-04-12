const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "API",
    message: "API Working fine"
  });
});

var addressController = require("../controllers/address");
var aisleController = require("../controllers/aisle");
var orderController = require("../controllers/order");
var productController = require("../controllers/product");
var subcategoryController = require("../controllers/subcategory");
var userController = require("../controllers/user");

router
  .route("/address")
  .get(addressController.index)
  .post(addressController.new);

router
  .route("/address/:address_id")
  .get(addressController.view)
  .put(addressController.update)
  .delete(addressController.delete);

router
  .route("/aisle")
  .get(aisleController.index)
  .post(aisleController.new);

router
  .route("/aisle/:aisle_id")
  .get(aisleController.view)
  .put(aisleController.update)
  .delete(aisleController.delete);

router
  .route("/order")
  .get(orderController.index)
  .post(orderController.new);

router
  .route("/order/:order_id")
  .get(orderController.view)
  .put(orderController.update)
  .delete(orderController.delete);

router
  .route("/product")
  .get(productController.index)
  .post(productController.new);

router
  .route("/product/:product_id")
  .get(productController.view)
  .put(productController.update)
  .delete(productController.delete);

router
  .route("/subcategory")
  .get(subcategoryController.index)
  .post(subcategoryController.new);

router
  .route("/subcategory/:subcategory_id")
  .get(subcategoryController.view)
  .put(subcategoryController.update)
  .delete(subcategoryController.delete);

router
  .route("/user")
  .get(userController.index)
  .post(userController.new);

router
  .route("/user/:user_id")
  .get(userController.view)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
