import api from "./api";

/*
|--------------------------------------------------------------------------
| USER ORDERS
|--------------------------------------------------------------------------
*/

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

/*
|--------------------------------------------------------------------------
| PLACE ORDER (COD)
|--------------------------------------------------------------------------
*/

export const placeOrder = async (addressId) => {
  const response = await api.post("/orders", {
    addressId,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| CANCEL ORDER
|--------------------------------------------------------------------------
*/

export const cancelOrder = async (id) => {
  const response = await api.patch(
    `/orders/${id}/cancel`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| RAZORPAY
|--------------------------------------------------------------------------
*/

export const createRazorpayOrder = async (amount) => {
  const response = await api.post(
    "/payments/create-order",
    {
      amount,
    }
  );

  return response.data;
};

export const verifyRazorpayPayment = async (
  paymentData
) => {
  const response = await api.post(
    "/payments/verify",
    paymentData
  );

  return response.data;
};