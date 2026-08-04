import { useEffect, useMemo, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const res = await getAllOrders();

      setOrders(res.data || []);

    } catch (err) {

      console.error(err);

      alert("Failed to load orders.");

    } finally {

      setLoading(false);

    }
  };

  const handleStatusChange = async (
    orderId,
    status
  ) => {
    try {

      await updateOrderStatus(
        orderId,
        status
      );

      await fetchOrders();

      alert("Order updated successfully.");

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Failed to update order."
      );

    }
  };

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      const keyword = search.toLowerCase();

      const matchesSearch =

        order.id
          .toLowerCase()
          .includes(keyword) ||

        order.user?.name
          ?.toLowerCase()
          .includes(keyword) ||

        order.user?.email
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =

        statusFilter === "ALL" ||

        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    orders,
    search,
    statusFilter,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">

        <h1 className="text-3xl font-bold">

          Loading Orders...

        </h1>

      </div>
    );
  }
    return (
    <div className="p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer orders
          </p>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-3 w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="PROCESSING">
              Processing
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </select>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">
                Order
              </th>

              <th className="text-left px-6 py-4">
                Customer
              </th>

              <th className="text-left px-6 py-4">
                Products
              </th>

              <th className="text-left px-6 py-4">
                Total
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-5">

                  <p className="font-semibold">
                    {order.id.slice(0, 12)}...
                  </p>

                </td>

                <td className="px-6 py-5">

                  <p className="font-semibold">
                    {order.user?.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {order.user?.email}
                  </p>

                </td>

                <td className="px-6 py-5">

                  {order.orderItems.length}

                </td>

                <td className="px-6 py-5 font-bold">

                  ₹{Number(order.total).toFixed(2)}

                </td>

                <td className="px-6 py-5">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="PROCESSING">
                      Processing
                    </option>

                    <option value="SHIPPED">
                      Shipped
                    </option>

                    <option value="DELIVERED">
                      Delivered
                    </option>

                    <option value="CANCELLED">
                      Cancelled
                    </option>

                  </select>

                </td>

                <td className="px-6 py-5">

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;
