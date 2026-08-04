const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../services/order.admin.service");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrders();

  res.status(200).json(
    new ApiResponse(
      200,
      orders,
      "Orders fetched successfully."
    )
  );
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(
    req.params.id,
    req.body.status
  );

  res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order status updated successfully."
    )
  );
});

module.exports = {
  getOrders,
  changeOrderStatus,
};