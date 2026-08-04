
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";


// Public Pages

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";

import Men from "./pages/Men";
import Kids from "./pages/Kids";
import ProductDetails from "./pages/ProductDetails";


// User Pages

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";


// Admin Pages

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/Orders";


function App() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");


 return (

  <div className="min-h-screen overflow-x-hidden">
    <ScrollToTop />

    {!isAdminRoute && <Navbar />}



      <Routes>


        {/* Public Routes */}


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/about"
          element={<About />}
        />


        <Route
          path="/contact"
          element={<Contact />}
        />


        <Route
          path="/faq"
          element={<FAQ />}
        />


        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />


        <Route
          path="/terms"
          element={<Terms />}
        />


        <Route
          path="/shipping-policy"
          element={<ShippingPolicy />}
        />


        <Route
          path="/return-policy"
          element={<ReturnPolicy />}
        />



        <Route
          path="/men"
          element={<Men />}
        />


        <Route
          path="/kids"
          element={<Kids />}
        />


        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />



        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />





        {/* Protected User Routes */}



        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />


        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />


        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          }
        />


        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />


        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>




        {/* Admin Routes */}



        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <Products />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute adminOnly>
              <AddProduct />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditProduct />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <AdminOrders />
            </ProtectedRoute>
          }
        />





        {/* 404 */}


        <Route
          path="*"
          element={<NotFound />}
        />


        </Routes>

      {!isAdminRoute && <Footer />}

     

  </div>
);
}


export default App;