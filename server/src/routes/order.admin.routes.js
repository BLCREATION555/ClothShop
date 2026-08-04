const express = require("express");

const router = express.Router();

const {
  protect,
  isAdmin,
} = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  getOrders,
  changeOrderStatus,
} = require("../controllers/order.admin.controller");

const {
  updateOrderStatusSchema,
} = require("../validators/order.validator");

router.use(protect);
router.use(isAdmin);

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
*/

router.get("/", getOrders);

/*
|--------------------------------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/status",
  validate(updateOrderStatusSchema),
  changeOrderStatus
);

module.exports = router;