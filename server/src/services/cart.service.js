const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const addToCart = async (userId, { productId, quantity }) => {
  // Check product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // Check stock
  if (product.stock < quantity) {
    throw new ApiError(400, "Insufficient stock.");
  }

  // Check if already in cart
  const existingCart = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  // Increase quantity if already exists
  if (existingCart) {
    const newQuantity = existingCart.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new ApiError(
        400,
        "Requested quantity exceeds available stock."
      );
    }

    return await prisma.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        quantity: newQuantity,
      },
      include: {
        product: true,
      },
    });
  }

  // Create new cart item
  return await prisma.cart.create({
    data: {
      userId,
      productId,
      quantity,
    },
    include: {
      product: true,
    },
  });
};

const getCart = async (userId) => {
  const cartItems = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return {
    cartItems,
    totalItems,
    totalPrice,
  };
};

const updateCartQuantity = async (userId, productId, quantity) => {
  const cartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    include: {
      product: true,
    },
  });

  if (!cartItem) {
    throw new ApiError(404, "Cart item not found.");
  }

  if (quantity > cartItem.product.stock) {
    throw new ApiError(400, "Insufficient stock.");
  }

  return await prisma.cart.update({
    where: {
      id: cartItem.id,
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });
};

const removeFromCart = async (userId, productId) => {
  const cartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!cartItem) {
    throw new ApiError(404, "Cart item not found.");
  }

  await prisma.cart.delete({
    where: {
      id: cartItem.id,
    },
  });

  return;
};

const clearCart = async (userId) => {
  await prisma.cart.deleteMany({
    where: {
      userId,
    },
  });

  return;
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};