const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
};