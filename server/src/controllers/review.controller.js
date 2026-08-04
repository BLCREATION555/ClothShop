const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const reviewService = require("../services/review.service");

const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(
    req.user.id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      review,
      "Review added successfully."
    )
  );
});

const getProductReviews = asyncHandler(async (req, res) => {
  const reviews =
    await reviewService.getProductReviews(
      req.params.productId
    );

  res.status(200).json(
    new ApiResponse(
      200,
      reviews,
      "Reviews fetched successfully."
    )
  );
});

const updateReview = asyncHandler(async (req, res) => {
  const review =
    await reviewService.updateReview(
      req.user.id,
      req.params.id,
      req.body
    );

  res.status(200).json(
    new ApiResponse(
      200,
      review,
      "Review updated successfully."
    )
  );
});

const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(
    req.user.id,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Review deleted successfully."
    )
  );
});

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};