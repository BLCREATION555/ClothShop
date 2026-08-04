const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const updateProductRating = async (productId) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 5
      : reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews;

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      rating: Number(
        averageRating.toFixed(1)
      ),
    },
  });

  return {
    averageRating,
    totalReviews,
  };
};

const createReview = async (
  userId,
  { productId, rating, comment }
) => {

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ApiError(
      404,
      "Product not found."
    );
  }

  const purchased =
    await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
          status: "DELIVERED",
        },
      },
    });

  if (!purchased) {
    throw new ApiError(
      403,
      "You can review only purchased products."
    );
  }

  const existing =
    await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

  if (existing) {
    throw new ApiError(
      400,
      "You already reviewed this product."
    );
  }

  const review =
    await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

  await updateProductRating(productId);

  return review;
};

const getProductReviews = async (
  productId
) => {

  const reviews =
    await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const totalReviews =
    reviews.length;

  const averageRating =
    totalReviews === 0
      ? 5
      : reviews.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        ) / totalReviews;

  return {
    averageRating,
    totalReviews,
    reviews,
  };
};

const updateReview = async (
  userId,
  reviewId,
  { rating, comment }
) => {

  const review =
    await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId,
      },
    });

  if (!review) {
    throw new ApiError(
      404,
      "Review not found."
    );
  }

  const updated =
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

  await updateProductRating(
    review.productId
  );

  return updated;
};

const deleteReview = async (
  userId,
  reviewId
) => {

  const review =
    await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId,
      },
    });

  if (!review) {
    throw new ApiError(
      404,
      "Review not found."
    );
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  await updateProductRating(
    review.productId
  );

  return;
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};