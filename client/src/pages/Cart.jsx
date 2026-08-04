import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    loading,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
  } = useCart();

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          Loading Cart...
        </h1>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="max-w-5xl mx-auto py-24 text-center">

        <FiShoppingCart
          size={80}
          className="mx-auto text-gray-300 mb-6"
        />

        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-xl"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col md:flex-row gap-6"
            >

              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-40 h-40 rounded-xl object-cover border"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.product.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.product.brand}
                </p>

                <p className="text-2xl font-bold text-green-600 mt-4">
                  ₹
                  {(
                    item.product.discountPrice ||
                    item.product.price
                  ).toFixed(2)}
                </p>

                <div className="flex items-center gap-4 mt-6">

                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.product.id,
                        Math.max(
                          1,
                          item.quantity - 1
                        )
                      )
                    }
                    className="w-10 h-10 rounded-lg border flex items-center justify-center"
                  >
                    <FiMinus />
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                    className="w-10 h-10 rounded-lg border flex items-center justify-center"
                  >
                    <FiPlus />
                  </button>

                </div>

              </div>

              <div className="flex flex-col justify-between items-end">

                <button
                  onClick={() =>
                    removeFromCart(
                      item.product.id
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={22} />
                </button>

                <h2 className="text-2xl font-bold">
                  ₹
                  {(
                    item.quantity *
                    (item.product.discountPrice ||
                      item.product.price)
                  ).toFixed(2)}
                </h2>

              </div>

            </div>

          ))}

        </div>

        {/* Summary */}

        <div>

          <div className="sticky top-24 bg-white rounded-2xl border shadow-sm p-8">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">

              <span>Items</span>

              <span>
                {cartItems.length}
              </span>

            </div>

            <div className="flex justify-between mb-4">

              <span>Shipping</span>

              <span className="text-green-600">
                FREE
              </span>

            </div>

            <hr className="my-6" />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>
                ₹{cartTotal.toFixed(2)}
              </span>

            </div>

            <Link
              to="/checkout"
              className="mt-8 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900"
            >
              Checkout

              <FiArrowRight />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;