const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const {
  sendOrderConfirmationEmail,
} = require("./email.service");

const createOrder = async (userId, addressId) => {
  // Check address belongs to user
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  // Get user's cart
  const cartItems = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  if (cartItems.length === 0) {
    throw new ApiError(400, "Your cart is empty.");
  }

  // Check stock & calculate total
  let total = 0;

  for (const item of cartItems) {
    if (item.product.stock < item.quantity) {
      throw new ApiError(
        400,
        `${item.product.name} is out of stock.`
      );
    }

    total +=
      (item.product.discountPrice ??
        item.product.price) *
      item.quantity;
  }

  // Transaction
  const order = await prisma.$transaction(
    async (tx) => {
      // Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,

          fullName: address.fullName,
          phone: address.phone,
          address: address.address,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,

          total,
        },
      });

      // Create Order Items
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price:
              item.product.discountPrice ??
              item.product.price,
          },
        });

        // Reduce Stock
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear Cart
      await tx.cart.deleteMany({
        where: {
          userId,
        },
      });

      return newOrder;
    }
  );

  // Get Complete Order
  const completeOrder =
    await prisma.order.findUnique({
      where: {
        id: order.id,
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

  // Send Email (Don't fail order if email fails)
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      await sendOrderConfirmationEmail(
        user.email,
        user.name,
        completeOrder
      );
    }
  } catch (err) {
    console.error(
      "Email Error:",
      err.message
    );
  }

  return completeOrder;
};

const getMyOrders = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
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

const getOrderById = async (
  userId,
  orderId
) => {
  const order =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
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
    throw new ApiError(
      404,
      "Order not found."
    );
  }

  return order;
};

const cancelOrderById = async (
  userId,
  orderId
) => {
  const order =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        orderItems: true,
      },
    });

  if (!order) {
    throw new ApiError(
      404,
      "Order not found."
    );
  }

  if (
    order.status !== "PENDING" &&
    order.status !== "PROCESSING"
  ) {
    throw new ApiError(
      400,
      "This order cannot be cancelled."
    );
  }

  return await prisma.$transaction(
    async (tx) => {
      // Restore Stock
      for (const item of order.orderItems) {
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // Cancel Order
      return await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "CANCELLED",
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
    }
  );
};

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

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrderById,
  getAllOrders,
};