const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrderById,
} = require("../services/order.service");

const placeOrder = asyncHandler(async (req, res) => {
  const order = await createOrder(
    req.user.id,
    req.body.addressId
  );

  res.status(201).json(
    new ApiResponse(
      201,
      order,
      "Order placed successfully."
    )
  );
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await getMyOrders(req.user.id);

  res.status(200).json(
    new ApiResponse(
      200,
      orders,
      "Orders fetched successfully."
    )
  );
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await getOrderById(
    req.user.id,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order fetched successfully."
    )
  );
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await cancelOrderById(
    req.user.id,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order cancelled successfully."
    )
  );
});

module.exports = {
  placeOrder,
  getOrders,
  getSingleOrder,
  cancelOrder,
};