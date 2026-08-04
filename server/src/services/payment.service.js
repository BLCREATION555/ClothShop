const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

const createPayment = async (
  userId,
  orderId,
  paymentMethod
) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      payment: true,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  if (order.userId !== userId) {
    throw new ApiError(
      403,
      "You are not authorized for this order."
    );
  }

  if (order.payment) {
    throw new ApiError(
      400,
      "Payment already exists."
    );
  }

  const payment = await prisma.payment.create({
    data: {
      orderId,
      paymentMethod,
      paymentStatus:
        paymentMethod === "COD"
          ? "PENDING"
          : "SUCCESS",
    },
    include: {
      order: true,
    },
  });

  return payment;
};

/*
|--------------------------------------------------------------------------
| Update Payment Status
|--------------------------------------------------------------------------
*/

const updatePaymentStatus = async (
  paymentId,
  paymentStatus,
  transactionId = null
) => {
  return await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      paymentStatus,
      transactionId,
    },
    include: {
      order: true,
    },
  });
};

/*
|--------------------------------------------------------------------------
| My Payments
|--------------------------------------------------------------------------
*/

const getMyPayments = async (userId) => {
  return await prisma.payment.findMany({
    where: {
      order: {
        userId,
      },
    },
    include: {
      order: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/*
|--------------------------------------------------------------------------
| Single Payment
|--------------------------------------------------------------------------
*/

const getPaymentById = async (
  paymentId,
  userId
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      order: {
        userId,
      },
    },
    include: {
      order: true,
    },
  });

  if (!payment) {
    throw new ApiError(
      404,
      "Payment not found."
    );
  }

  return payment;
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getMyPayments,
  getPaymentById,
};