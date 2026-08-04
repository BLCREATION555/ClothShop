import { Link, useNavigate } from "react-router-dom";

import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    const success = await addToCart(product.id);

    if (success) {
      toast.success("Added to cart");
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    await addToWishlist(product);
  };

  const discount =
    product.discountPrice &&
    Math.round(
      ((product.price - product.discountPrice) /
        product.price) *
        100
    );

  return (
    <div
      onClick={openProduct}
      className="
        group
        cursor-pointer
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-500
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="
w-full
h-52
sm:h-64
lg:h-80

object-cover

group-hover:scale-110
transition
duration-700
"
        />

        {/* Discount */}

        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1
lg:px-3 rounded-full text-sm font-bold">
            -{discount}%
          </span>
        )}

        {/* Stock */}

        <span
          className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock > 0
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {product.stock > 0
            ? "In Stock"
            : "Out Of Stock"}
        </span>

        {/* Wishlist */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          className="
            absolute
            top-4
            right-4
            z-30
            bg-white
            p-2
lg:p-3
            rounded-full
            shadow-lg
            hover:bg-red-500
            hover:text-white
            transition
          "
        >
          <FiHeart size={20} />
        </button>

        {/* Hover Buttons */}

        <div
          className="
            absolute
            inset-0
            bg-black/20
            opacity-0
            group-hover:opacity-100
            transition
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={product.stock <= 0}
            className={`rounded-full p-4 transition ${
              product.stock > 0
                ? "bg-white hover:bg-black hover:text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <FiShoppingCart size={22} />
          </button>

          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white
              rounded-full
              p-4
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <FiEye size={22} />
          </Link>

        </div>

      </div>

      {/* Details */}


      {/* Details */}

     <div className="p-4 lg:p-6">

       <p className="text-xs lg:text-sm uppercase tracking-widest text-gray-400">
          {product.brand}
        </p>

        <h2 className="text-base
lg:text-xl  font-bold mt-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h2>

        <p className="text-gray-500
text-sm
mt-1
lg:mt-2">
          {product.fit}
        </p>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-4">

          {[...Array(5)].map((_, index) => (

            <FiStar
              key={index}
             size={14}
              className={
                index <
                Math.round(product.rating || 5)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />

          ))}

          <span className="text-sm text-gray-500 ml-2">
            ({product.rating || 5})
          </span>

        </div>

        {/* Price */}

        <div className="flex items-center gap-3 mt-5">

          <span className="text-lg
lg:text-2xl font-bold">
            ₹
            {product.discountPrice ||
              product.price}
          </span>

          {product.discountPrice && (

            <span className="text-gray-400 line-through">
              ₹{product.price}
            </span>

          )}

        </div>

        {/* Cart Button */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={product.stock <= 0}
          className={`w-full mt-6 py-2.5
lg:py-3 rounded-xl font-semibold transition ${
            product.stock > 0
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >

          {product.stock > 0
            ? "Add To Cart"
            : "Out Of Stock"}

        </button>

      </div>

    </div>
  );
}

export default ProductCard;