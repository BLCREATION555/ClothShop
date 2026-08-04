import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

import { Link } from "react-router-dom";


function Footer() {

  return (

    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


          {/* Company */}

          <div>

            <h2 className="text-3xl font-bold mb-5">
              BL CREATION
            </h2>


            <p className="text-gray-400 leading-7">
              Premium men's and kids clothing with
              stylish designs, premium fabrics,
              and affordable prices.
            </p>


            <div className="flex gap-4 mt-6">


              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition"
              >
                <FiFacebook />
              </a>


              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition"
              >
                <FiInstagram />
              </a>


              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition"
              >
                <FiTwitter />
              </a>


            </div>


          </div>




          {/* Shop */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Shop
            </h3>


            <ul className="space-y-3 text-gray-400">


              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>


              <li>
                <Link to="/men" className="hover:text-white">
                  Men's Collection
                </Link>
              </li>


              <li>
                <Link to="/kids" className="hover:text-white">
                  Kids Collection
                </Link>
              </li>


              <li>
                <Link to="/wishlist" className="hover:text-white">
                  Wishlist
                </Link>
              </li>


              <li>
                <Link to="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>


            </ul>


          </div>




          {/* Customer Support */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Customer Support
            </h3>


            <ul className="space-y-3 text-gray-400">


              <li>
                <Link
                  to="/orders"
                  className="hover:text-white"
                >
                  My Orders
                </Link>
              </li>


              <li>
                <Link
                  to="/addresses"
                  className="hover:text-white"
                >
                  Addresses
                </Link>
              </li>


              <li>
                <Link
                  to="/profile"
                  className="hover:text-white"
                >
                  My Profile
                </Link>
              </li>


              <li>
                <Link
                  to="/faq"
                  className="hover:text-white"
                >
                  FAQ
                </Link>
              </li>


              <li>
                <Link
                  to="/contact"
                  className="hover:text-white"
                >
                  Contact Us
                </Link>
              </li>


            </ul>


          </div>




          {/* Policies */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Policies
            </h3>


            <ul className="space-y-3 text-gray-400">


              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>


              <li>
                <Link
                  to="/terms"
                  className="hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>


              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-white"
                >
                  Shipping Policy
                </Link>
              </li>


              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-white"
                >
                  Return Policy
                </Link>
              </li>


            </ul>


          </div>


        </div>




        <hr className="border-gray-700 my-10" />



        <div className="flex flex-col md:flex-row justify-between items-center gap-4">


          <p className="text-gray-400 text-center">

            © {new Date().getFullYear()} BL CREATION.
            All Rights Reserved.

          </p>


          <p className="text-gray-500 text-sm">

            Designed & Developed with ❤️

          </p>


        </div>


      </div>


    </footer>

  );

}


export default Footer;