const { z } = require("zod");

const addToCartSchema = z.object({
  productId: z
    .string()
    .min(1, "Product ID is required."),
  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .min(1, "Quantity must be at least 1."),
});

const updateCartSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .min(1, "Quantity must be at least 1."),
});

module.exports = {
  addToCartSchema,
  updateCartSchema,
};