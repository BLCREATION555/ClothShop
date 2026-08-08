import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadInvoice } from "../services/invoice.service";

import {
  FiArrowLeft,
  FiShoppingBag,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import {
  getOrderById,
  cancelOrder,
} from "../services/orderService";

const statusConfig = {
  PENDING: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <FiClock />,
  },
  PROCESSING: {
    color: "bg-blue-100 text-blue-700",
    icon: <FiShoppingBag />,
  },
  SHIPPED: {
    color: "bg-purple-100 text-purple-700",
    icon: <FiTruck />,
  },
  DELIVERED: {
    color: "bg-green-100 text-green-700",
    icon: <FiCheckCircle />,
  },
  CANCELLED: {
    color: "bg-red-100 text-red-700",
    icon: <FiXCircle />,
  },
};

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancelling(true);
      await cancelOrder(id);
      alert("Order cancelled.");
      fetchOrder();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading Order...</div>;
  }

  if (!order) {
    return <div className="p-10 text-center">Order Not Found</div>;
  }

  const canCancel =
    order.status === "PENDING" || order.status === "PROCESSING";

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-black"
      >
        <FiArrowLeft />
        Back
      </button>

      <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold">Order Details</h1>
          <p className="text-gray-500 mt-2">Order ID : {order.id}</p>
          <p className="text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold ${
            statusConfig[order.status]?.color
          }`}
        >
          {statusConfig[order.status]?.icon}
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          {/* Products */}
          <div className="bg-white rounded-2xl shadow border p-6">
            <h2 className="text-2xl font-bold mb-6">Products</h2>

            <div className="space-y-6">
              {order.orderItems?.map((item) => {
                const imageUrl =
                  item.product?.images?.[0]?.imageUrl;

                return (
                  <div
                    key={item.id}
                    className="flex gap-5 border-b pb-5 last:border-0"
                  >
                    <img
                      src={
                        imageUrl && imageUrl.startsWith("http")
                          ? imageUrl
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.product?.name}
                      className="w-28 h-28 rounded-xl border object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {item.product?.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Brand : {item.product?.brand}
                      </p>

                      <p className="text-gray-500">
                        Quantity : {item.quantity}
                      </p>

                      <p className="font-bold text-green-600 mt-3 text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow border p-6">
            <h2 className="text-2xl font-bold mb-5">
              Delivery Address
            </h2>

            <p className="font-bold text-lg">{order.fullName}</p>
            <p>{order.phone}</p>
            <p>{order.address}</p>
            <p>
              {order.city}, {order.state}
            </p>
            <p>
              {order.country} - {order.pincode}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-2xl shadow border p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Number(order.total).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{Number(order.total).toFixed(2)}</span>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => downloadInvoice(order.id)}
                  className="w-full bg-black text-white py-3 rounded-xl"
                >
                  Download Invoice
                </button>

                {canCancel && (
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl"
                  >
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;