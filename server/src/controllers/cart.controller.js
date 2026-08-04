const cartService = require("../services/cart.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user.id, req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      cart,
      "Product added to cart successfully."
    )
  );
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);

  res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart fetched successfully."
    )
  );
});

const updateCartQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await cartService.updateCartQuantity(
    req.user.id,
    productId,
    quantity
  );

  res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart updated successfully."
    )
  );
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  await cartService.removeFromCart(req.user.id, productId);

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Product removed from cart."
    )
  );
});

const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user.id);

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Cart cleared successfully."
    )
  );
});

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};