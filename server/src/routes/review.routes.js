const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  createReviewSchema,
  updateReviewSchema,
} = require("../validators/review.validator");

const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.get(
  "/product/:productId",
  getProductReviews
);

router.post(
  "/",
  protect,
  validate(createReviewSchema),
  createReview
);

router.patch(
  "/:id",
  protect,
  validate(updateReviewSchema),
  updateReview
);

router.delete(
  "/:id",
  protect,
  deleteReview
);

module.exports = router;