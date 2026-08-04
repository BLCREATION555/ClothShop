const { z } = require("zod");

const createReviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required."),

  rating: z
    .number({
      required_error: "Rating is required.",
      invalid_type_error: "Rating must be a number.",
    })
    .int()
    .min(1, "Minimum rating is 1.")
    .max(5, "Maximum rating is 5."),

  comment: z
    .string()
    .min(3, "Comment is too short.")
    .max(500, "Comment is too long."),
});

const updateReviewSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required.",
      invalid_type_error: "Rating must be a number.",
    })
    .int()
    .min(1)
    .max(5),

  comment: z
    .string()
    .min(3)
    .max(500),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};