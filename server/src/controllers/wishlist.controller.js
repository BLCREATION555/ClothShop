const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../services/wishlist.service");

const addWishlist = asyncHandler(async (req, res) => {
  const wishlist = await addToWishlist(req.user.id, req.body.productId);

  res.status(201).json(
    new ApiResponse(201, wishlist, "Product added to wishlist.")
  );
});

const getUserWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getWishlist(req.user.id);

  res.status(200).json(
    new ApiResponse(200, wishlist, "Wishlist fetched successfully.")
  );
});

const removeWishlist = asyncHandler(async (req, res) => {
  await removeFromWishlist(req.user.id, req.params.productId);

  res.status(200).json(
    new ApiResponse(200, null, "Product removed from wishlist.")
  );
});

module.exports = {
  addWishlist,
  getUserWishlist,
  removeWishlist,
};