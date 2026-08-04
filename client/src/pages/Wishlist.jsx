import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlistItems,
    loading,
    removeFromWishlist,
  } = useWishlist();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h1 className="text-2xl font-bold">
          Loading Wishlist...
        </h1>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">

        <h1 className="text-4xl font-bold">
          Wishlist is Empty
        </h1>

        <p className="text-gray-500 mt-4">
          Save your favourite products here.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Wishlist
      </h1>

      <div className="space-y-5">

        {wishlistItems.map((item) => {

          const product = item.product;

          return (

            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow rounded-xl p-5"
            >

              <div className="flex gap-5 items-center">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 rounded-lg object-cover"
                />

                <div>

                  <h2 className="text-xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-gray-500">
                    {product.brand}
                  </p>

                  <p className="font-semibold mt-2">
                    ₹
                    {product.discountPrice ||
                      product.price}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  removeFromWishlist(product.id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default Wishlist;