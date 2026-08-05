const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// ======================
// Create Product
// ======================

const createProduct = async (data, files) => {
  const category = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  if (!files || files.length === 0) {
    throw new ApiError(
      400,
      "At least one product image is required."
    );
  }

  // Upload every image to Cloudinary
  const uploadedImages = [];

  for (const file of files) {
    const uploaded = await uploadToCloudinary(file.buffer);

    uploadedImages.push({
      imageUrl: uploaded.secure_url,
    });
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,

      price: Number(data.price),

      discountPrice: data.discountPrice
        ? Number(data.discountPrice)
        : null,

      brand: data.brand,
      gender: data.gender,
      fit: data.fit,

      rating: data.rating
        ? Number(data.rating)
        : 5,

      stock: Number(data.stock),

      isFeatured:
        data.isFeatured === true ||
        data.isFeatured === "true",

      isNewArrival:
        data.isNewArrival === true ||
        data.isNewArrival === "true",

      isTrending:
        data.isTrending === true ||
        data.isTrending === "true",

      isBestSeller:
        data.isBestSeller === true ||
        data.isBestSeller === "true",

      isOnSale:
        data.isOnSale === true ||
        data.isOnSale === "true",

      categoryId: data.categoryId,

      images: {
        create: uploadedImages,
      },
    },

    include: {
      images: true,
      category: true,
    },
  });

  return product;
};

// ======================
// Get All Products
// ======================

const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
// ======================
// Get Product By ID
// ======================

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      category: true,
      images: true,

      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return product;
};

// ======================
// Update Product
// ======================

const updateProduct = async (
  id,
  data,
  files
) => {
  const existingProduct =
    await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        images: true,
      },
    });

  if (!existingProduct) {
    throw new ApiError(
      404,
      "Product not found."
    );
  }

  if (data.categoryId) {
    const category =
      await prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });

    if (!category) {
      throw new ApiError(
        404,
        "Category not found."
      );
    }
  }

  // Upload new images if provided

  if (files && files.length > 0) {
    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    const uploadedImages = [];

    for (const file of files) {
      const uploaded =
        await uploadToCloudinary(
          file.buffer
        );

      uploadedImages.push({
        imageUrl: uploaded.secure_url,
        productId: id,
      });
    }

    await prisma.productImage.createMany({
      data: uploadedImages,
    });
  }
console.log("DATA RECEIVED:", data);
  return prisma.product.update({
    where: {
      id,
    },

    data: {
      name:
        data.name ??
        existingProduct.name,

      description:
        data.description ??
        existingProduct.description,

      price:
        data.price !== undefined
          ? Number(data.price)
          : existingProduct.price,

      discountPrice:
        data.discountPrice !==
        undefined
          ? Number(data.discountPrice)
          : existingProduct.discountPrice,

      brand:
        data.brand ??
        existingProduct.brand,

      gender:
        data.gender ??
        existingProduct.gender,

      fit:
        data.fit ??
        existingProduct.fit,

      rating:
        data.rating !== undefined
          ? Number(data.rating)
          : existingProduct.rating,

      stock:
        data.stock !== undefined
          ? Number(data.stock)
          : existingProduct.stock,

      isFeatured:
        data.isFeatured !==
        undefined
          ? data.isFeatured === true ||
            data.isFeatured ===
              "true"
          : existingProduct.isFeatured,

      isNewArrival:
        data.isNewArrival !==
        undefined
          ? data.isNewArrival ===
              true ||
            data.isNewArrival ===
              "true"
          : existingProduct.isNewArrival,

      isTrending:
        data.isTrending !==
        undefined
          ? data.isTrending ===
              true ||
            data.isTrending ===
              "true"
          : existingProduct.isTrending,

      isBestSeller:
        data.isBestSeller !==
        undefined
          ? data.isBestSeller ===
              true ||
            data.isBestSeller ===
              "true"
          : existingProduct.isBestSeller,

      isOnSale:
        data.isOnSale !==
        undefined
          ? data.isOnSale ===
              true ||
            data.isOnSale ===
              "true"
          : existingProduct.isOnSale,

      categoryId:
        data.categoryId ??
        existingProduct.categoryId,
    },

    include: {
      images: true,
      category: true,
    },
  });
};

// ======================
// Delete Product
// ======================

const deleteProduct = async (
  id
) => {
  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!product) {
    throw new ApiError(
      404,
      "Product not found."
    );
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });
};

// ======================
// Exports
// ======================

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
