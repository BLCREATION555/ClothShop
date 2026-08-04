import api from "./api";

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
*/

export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.patch(
    `/admin/orders/${orderId}/status`,
    {
      status,
    }
  );

  return response.data;
};