const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const addToWishlist = async (userId, productId) => {
  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // Check if already in wishlist
  const existingWishlist = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existingWishlist) {
    throw new ApiError(400, "Product already in wishlist.");
  }

  // Add to wishlist
  const wishlist = await prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
    include: {
      product: true,
    },
  });

  return wishlist;
};

const getWishlist = async (userId) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });
};

const removeFromWishlist = async (userId, productId) => {
  const wishlistItem = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!wishlistItem) {
    throw new ApiError(404, "Wishlist item not found.");
  }

  await prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return;
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};