const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

const createProduct = async (data, file) => {
  const category = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  if (!file) {
    throw new ApiError(400, "Product image is required.");
  }

  const uploadedImage = await uploadToCloudinary(file.buffer);

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      image: uploadedImage.secure_url,
      price: Number(data.price),
      discountPrice: data.discountPrice
        ? Number(data.discountPrice)
        : null,
      brand: data.brand,
      gender: data.gender,
      fit: data.fit,
      rating: data.rating ? Number(data.rating) : 5,
      stock: Number(data.stock),
      isFeatured:
        data.isFeatured === true || data.isFeatured === "true",
      categoryId: data.categoryId,
    },
  });

  return product;
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
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

const updateProduct = async (id, data, file) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new ApiError(404, "Product not found.");
  }

  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }
  }

  let image = existingProduct.image;

  if (file) {
    const uploadedImage = await uploadToCloudinary(file.buffer);
    image = uploadedImage.secure_url;
  }

  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      image,
      price:
        data.price !== undefined
          ? Number(data.price)
          : existingProduct.price,
      discountPrice:
        data.discountPrice !== undefined
          ? Number(data.discountPrice)
          : existingProduct.discountPrice,
      rating:
        data.rating !== undefined
          ? Number(data.rating)
          : existingProduct.rating,
      stock:
        data.stock !== undefined
          ? Number(data.stock)
          : existingProduct.stock,
      isFeatured:
        data.isFeatured !== undefined
          ? data.isFeatured === true || data.isFeatured === "true"
          : existingProduct.isFeatured,
    },
  });
};

const deleteProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  await prisma.product.delete({
    where: { id },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};