const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const {
  createPayment,
  getMyPayments,
  getPaymentById,
} = require("../services/payment.service");

/*
|--------------------------------------------------------------------------
| Razorpay Instance
|--------------------------------------------------------------------------
*/

let razorpay = null;

if (
  process.env.RAZORPAY_KEY_ID &&
  process.env.RAZORPAY_KEY_SECRET
) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/*
|--------------------------------------------------------------------------
| COD Payment
|--------------------------------------------------------------------------
*/

const create = asyncHandler(async (req, res) => {
  const payment = await createPayment(
    req.user.id,
    req.body.orderId,
    req.body.paymentMethod
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      payment,
      "Payment created successfully."
    )
  );
});

/*
|--------------------------------------------------------------------------
| Razorpay Create Order
|--------------------------------------------------------------------------
*/

const createRazorpayOrder = asyncHandler(async (req, res) => {
  if (!razorpay) {
    return res.status(503).json(
      new ApiResponse(
        503,
        null,
        "Razorpay is not configured."
      )
    );
  }

  const { amount } = req.body;

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Razorpay order created successfully."
    )
  );
});

/*
|--------------------------------------------------------------------------
| Razorpay Verify Payment
|--------------------------------------------------------------------------
*/

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(503).json(
      new ApiResponse(
        503,
        null,
        "Razorpay is not configured."
      )
    );
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body =
    razorpay_order_id +
    "|" +
    razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(body)
    .digest("hex");

  const verified =
    expectedSignature === razorpay_signature;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        verified,
      },
      verified
        ? "Payment verified successfully."
        : "Payment verification failed."
    )
  );
});

/*
|--------------------------------------------------------------------------
| Payment History
|--------------------------------------------------------------------------
*/

const getPayments = asyncHandler(async (req, res) => {
  const payments = await getMyPayments(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      payments,
      "Payments fetched successfully."
    )
  );
});

const getSinglePayment = asyncHandler(async (req, res) => {
  const payment = await getPaymentById(
    req.params.id,
    req.user.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      payment,
      "Payment fetched successfully."
    )
  );
});

module.exports = {
  create,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getPayments,
  getSinglePayment,
};