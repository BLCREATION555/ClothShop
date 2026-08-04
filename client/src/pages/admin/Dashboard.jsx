import AdminLayout from "../../components/admin/AdminLayout";
import DashboardCards from "../../components/admin/DashboardCards";
import RecentOrders from "../../components/admin/RecentOrders";
import LowStockProducts from "../../components/admin/LowStockProducts";
import TopSellingProducts from "../../components/admin/TopSellingProducts";

function Dashboard() {
  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back to BL CREATION Admin Panel
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border px-6 py-4">

          <p className="text-sm text-gray-500">
            Today
          </p>

          <h2 className="font-bold">
            {new Date().toLocaleDateString("en-IN")}
          </h2>

        </div>

      </div>

      <DashboardCards />

      <div className="mt-10">
        <RecentOrders />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <LowStockProducts />

        <TopSellingProducts />

      </div>

    </AdminLayout>
  );
}

export default Dashboard;