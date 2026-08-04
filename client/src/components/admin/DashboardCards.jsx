import { useEffect, useState } from "react";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

import { getDashboard } from "../../services/dashboard.service";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      const data = res.data || {};

      setStats({
        totalProducts: data.totalProducts || 0,
        totalOrders: data.totalOrders || 0,
        totalCustomers: data.totalCustomers || 0,
        totalRevenue: data.totalRevenue || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FiBox size={30} />,
      bg: "bg-blue-600",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <FiShoppingBag size={30} />,
      bg: "bg-green-600",
    },
    {
      title: "Revenue",
      value: `₹${Number(
        stats.totalRevenue
      ).toLocaleString("en-IN")}`,
      icon: <FiDollarSign size={30} />,
      bg: "bg-yellow-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: <FiUsers size={30} />,
      bg: "bg-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.bg} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;