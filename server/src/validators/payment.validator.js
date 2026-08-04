const { z } = require("zod");

const createPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required."),
  paymentMethod: z.enum(["COD", "RAZORPAY"], {
    errorMap: () => ({
      message: "Payment method must be COD or RAZORPAY.",
    }),
  }),
});

module.exports = {
  createPaymentSchema,
};