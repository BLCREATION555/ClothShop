const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const {
  generateInvoice,
} = require("../services/invoice.service");

const downloadInvoice = async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    generateInvoice(order, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  downloadInvoice,
};