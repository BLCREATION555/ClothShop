import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiPlusCircle,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
   const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? "bg-black text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;
const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
};
  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b">
        <h1 className="text-3xl font-extrabold tracking-wide">
          BL CREATION
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-3">

        <NavLink
          to="/admin"
          end
          className={linkClass}
        >
          <FiHome size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={linkClass}
        >
          <FiPackage size={20} />
          Products
        </NavLink>

        <NavLink
          to="/admin/products/add"
          className={linkClass}
        >
          <FiPlusCircle size={20} />
          Add Product
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={linkClass}
        >
          <FiShoppingBag size={20} />
          Orders
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="border-t p-5">
<button
  onClick={handleLogout}
  className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
>
          <FiLogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;