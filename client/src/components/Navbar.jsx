import { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import logo from "../assets/logo-icon.png";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const navigate = useNavigate();

  const { cartItems } = useCart();

  const { wishlistItems } =
    useWishlist();

  const { search, setSearch } =
    useSearch();

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [menuOpen]);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/login");

  };

  const navLinkClass = ({
    isActive,
  }) =>
    isActive
      ? "relative text-black font-semibold after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-black"
      : "text-gray-600 hover:text-black transition duration-300";

  return (

    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b shadow-lg"
          : "bg-white"
      }`}
    >

    <div className="max-w-[1700px] mx-auto h-20 px-4 lg:px-10 xl:px-16 flex items-center justify-between">

        {/* Logo */}

<Link
  to="/"
  className="flex items-center gap-2 lg:gap-4 group shrink-0"
>

<img
  src={logo}
  alt="BL CREATION"
 className="
h-12
w-12
lg:h-16
lg:w-16
object-contain
transition-transform
duration-300
group-hover:scale-110
"
/>
  <div className="leading-tight">

   <h1 className="text-lg lg:text-3xl font-black tracking-[0.08em] lg:tracking-[0.18em]">
      BL CREATION
    </h1>

   <p className="hidden lg:block text-[11px] tracking-[0.45em] text-amber-600 uppercase font-semibold">
      Premium Fashion
    </p>

  </div>

</Link>

        {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10 mx-10">

          <li>
            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/men"
              className={navLinkClass}
            >
              Men
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/kids"
              className={navLinkClass}
            >
              Kids
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={navLinkClass}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={navLinkClass}
            >
              Contact
            </NavLink>
          </li>

        </ul>

        {/* Desktop Right */}

               <div className="hidden lg:flex items-center gap-6 shrink-0">

          {/* Search */}

          <div
            className="
              flex
              items-center
              bg-gray-100
              hover:bg-white
              border
              border-transparent
              focus-within:border-black
              rounded-full
              px-5
              py-3
             w-[280px] xl:w-[340px]
              transition-all
              duration-300
            "
          >

            <FiSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none text-sm"
            />

          </div>

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className="relative group"
          >

            <FiHeart
              size={24}
              className="group-hover:scale-125 transition duration-300"
            />

            {wishlistItems.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  text-[10px]
                  font-bold
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {wishlistItems.length}
              </span>

            )}

          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative group"
          >

            <FiShoppingCart
              size={24}
              className="group-hover:scale-125 transition duration-300"
            />

            {cartItems.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-gradient-to-r
                  from-black
                  to-gray-700
                  text-white
                  text-[10px]
                  font-bold
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {cartItems.length}
              </span>

            )}

          </Link>

          {/* User */}

          {token ? (

            <>

              <Link
                to="/profile"
                className="hover:scale-125 transition duration-300"
              >
                <FiUser size={24} />
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 hover:scale-125 transition duration-300"
              >
                <FiLogOut size={24} />
              </button>

            </>

          ) : (

            <Link
              to="/login"
              className="hover:scale-125 transition duration-300"
            >
              <FiUser size={24} />
            </Link>

          )}

        </div>

        {/* Mobile Right */}
               <div className="flex items-center gap-3 lg:hidden shrink-0">

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className="relative"
          >

          <FiHeart size={20} />

            {wishlistItems.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  text-[10px]
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {wishlistItems.length}
              </span>

            )}

          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative"
          >

           <FiShoppingCart size={20} />

            {cartItems.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-gradient-to-r
                  from-black
                  to-gray-700
                  text-white
                  text-[10px]
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {cartItems.length}
              </span>

            )}

          </Link>

          {/* Menu */}

          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="
            text-2xl
              hover:scale-110
              transition
              duration-300
            "
          >
            <FiMenu />
          </button>

        </div>

      </div>

      {/* Overlay */}
      

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-50 overflow-hidden"
        />
      )}

      {/* Mobile Drawer */}

      <div
        className={`fixed top-0 right-0 h-screen w-[320px] max-w-[100vw] bg-white/95 backdrop-blur-xl z-[60] shadow-2xl transition-transform duration-500 ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Drawer Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-black tracking-wide">
              BL CREATION
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Premium Fashion
            </p>

          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl hover:rotate-90 transition duration-300"
          >
            <FiX />
          </button>

        </div>

        {/* Mobile Search */}

        <div className="p-6">

          <div
            className="
              flex
              items-center
              bg-gray-100
              rounded-full
              px-5
              py-3
            "
          >

            <FiSearch />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none"
            />

          </div>

        </div>

        {/* Navigation */}
               

        <div className="flex flex-col px-6">

          {[
            ["Home", "/"],
            ["Men", "/men"],
            ["Kids", "/kids"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, link]) => (

            <NavLink
              key={link}
              to={link}
              onClick={() => setMenuOpen(false)}
             className={({ isActive }) =>
  `py-4 border-b text-lg transition-all duration-300 ${
    isActive
      ? "text-black font-bold pl-2 border-l-4 border-black bg-gray-50"
      : "hover:pl-2 text-gray-600"
  }`
}
            >
              {label}
            </NavLink>

          ))}

          {token ? (

            <>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b text-lg hover:pl-2 transition-all duration-300"
              >
                My Profile
              </NavLink>

              <NavLink
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b text-lg hover:pl-2 transition-all duration-300"
              >
                My Orders
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b text-lg hover:pl-2 transition-all duration-300"
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b text-lg hover:pl-2 transition-all duration-300"
              >
                Cart
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-left py-5 text-red-500 font-semibold hover:pl-2 transition-all duration-300"
              >
                Logout
              </button>

            </>

          ) : (

            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-4 border-b text-lg hover:pl-2 transition-all duration-300"
            >
              Login
            </NavLink>

          )}

        </div>

        {/* Footer */}
             

        <div className="absolute bottom-6 left-0 w-full">

          <div className="text-center">

            <p className="text-gray-400 text-sm">
              © 2026 BL CREATION
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Premium Fashion Store
            </p>

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;