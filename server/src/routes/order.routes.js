const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createOrderSchema,
} = require("../validators/order.validator");

const {
  placeOrder,
  getOrders,
  getSingleOrder,
  cancelOrder,
} = require("../controllers/order.controller");

router.use(protect);

// Place Order
router.post(
  "/",
  validate(createOrderSchema),
  placeOrder
);

// My Orders
router.get("/", getOrders);

// Single Order
router.get("/:id", getSingleOrder);

// Cancel Order
router.patch("/:id/cancel", cancelOrder);

module.exports = router;