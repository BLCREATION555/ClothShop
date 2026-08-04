const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  addToCartSchema,
  updateCartSchema,
} = require("../validators/cart.validator");

router.post(
  "/",
  protect,
  validate(addToCartSchema),
  cartController.addToCart
);

router.get(
  "/",
  protect,
  cartController.getCart
);

router.patch(
  "/:productId",
  protect,
  validate(updateCartSchema),
  cartController.updateCartQuantity
);

router.delete(
  "/:productId",
  protect,
  cartController.removeFromCart
);

router.delete(
  "/clear",
  protect,
  cartController.clearCart
);

module.exports = router;