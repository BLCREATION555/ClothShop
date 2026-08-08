import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiShoppingBag,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";

import { getOrders } from "../services/orderService";

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

function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();

      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-5xl mx-auto py-24 text-center">

        <FiShoppingBag
          size={70}
          className="mx-auto text-gray-300 mb-6"
        />

        <h1 className="text-4xl font-bold">
          No Orders Yet
        </h1>

        <p className="text-gray-500 mt-3">
          Start shopping and your orders will appear here.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track your purchases and delivery status.
        </p>

      </div>

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-2xl shadow border overflow-hidden"
          >

            {/* Header */}

            <div className="bg-gray-50 border-b px-6 py-5 flex flex-wrap justify-between gap-6">

              <div>

                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <h2 className="font-semibold break-all">
                  {order.id}
                </h2>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Date
                </p>

                <h2 className="font-semibold">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </h2>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total
                </p>

                <h2 className="text-xl font-bold">
                  ₹{Number(order.total).toFixed(2)}
                </h2>

              </div>

              <div>

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    statusConfig[order.status]?.color
                  }`}
                >
                  {statusConfig[order.status]?.icon}

                  {order.status}

                </span>

              </div>

            </div>

            {/* Products */}

            <div className="p-6">

              <div className="space-y-5">

                {order.orderItems?.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-5 items-center border-b pb-5 last:border-0"
                  >

                   <img
  src={
    item.product?.images?.[0]?.imageUrl?.startsWith("http")
      ? item.product.images[0].imageUrl
      : `https://blcreation-api.onrender.com/${item.product?.images?.[0]?.imageUrl}`
  }
  alt={item.product?.name}
  className="w-24 h-24 rounded-xl object-cover border"
/>

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {item.product?.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Qty : {item.quantity}
                      </p>

                      <p className="text-green-600 font-bold mt-2">
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <div className="flex justify-end mt-8">

                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  View Details

                  <FiArrowRight />

                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Orders;