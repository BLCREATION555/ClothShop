const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  create,
  getPayments,
  getSinglePayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/payment.controller");

const validate = require("../middleware/validate.middleware");

const {
  createPaymentSchema,
} = require("../validators/payment.validator");

// Protect all routes
router.use(protect);

/*
|--------------------------------------------------------------------------
| COD Payment
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createPaymentSchema),
  create
);

/*
|--------------------------------------------------------------------------
| Razorpay
|--------------------------------------------------------------------------
*/

router.post(
  "/create-order",
  createRazorpayOrder
);

router.post(
  "/verify",
  verifyRazorpayPayment
);

/*
|--------------------------------------------------------------------------
| Payment History
|--------------------------------------------------------------------------
*/

router.get("/", getPayments);

router.get("/:id", getSinglePayment);

module.exports = router;