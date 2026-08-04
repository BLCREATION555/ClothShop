const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const prisma = require("../config/prisma");

const getDashboard = asyncHandler(async (req, res) => {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.order.count(),

    prisma.user.count({
      where: {
        role: "USER",
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue:
          totalRevenue._sum.total || 0,
        recentOrders,
      },
      "Dashboard fetched successfully."
    )
  );
});

module.exports = {
  getDashboard,
};