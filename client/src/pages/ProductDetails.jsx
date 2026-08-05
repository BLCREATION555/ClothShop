
import RelatedProducts from "../components/RelatedProducts";
import RecentlyViewed from "../components/RecentlyViewed";
import ReviewSection from "../components/review/ReviewSection";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../services/product.service";

function ProductDetails() {
  const { id } = useParams();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
  if (product) {
    document.title = `${product.name} | BL CREATION`;
  }
}, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await getProductById(id);

      const currentProduct = res.data || res;

     setProduct(currentProduct);

if (currentProduct.images?.length) {
  setSelectedImage(currentProduct.images[0].imageUrl);
}

      let recent = JSON.parse(
        localStorage.getItem("recentProducts") || "[]"
      );

      recent = recent.filter(
        (item) => item.id !== currentProduct.id
      );

      recent.unshift(currentProduct);

      recent = recent.slice(0, 8);

      localStorage.setItem(
        "recentProducts",
        JSON.stringify(recent)
      );
  } catch (err) {
  console.error("Product Error:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);
  setProduct(null);
} finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id);
      }

      toast.success(
        `${quantity} item${quantity > 1 ? "s" : ""} added to cart`
      );
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to add product."
      );
    } finally {
      setAdding(false);
    }
  };
    if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Product...
        </h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }
const discount = product.discountPrice || 0;

const finalPrice =
  discount > 0
    ? Math.round(
        product.price * (1 - discount / 100)
      )
    : product.price;

const save = product.price - finalPrice;

  return (
  <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

        {/* Image */}

        <div className="relative">

          {discount > 0 && (
            <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full font-bold z-20">
              {discount}% OFF
            </div>
          )}

<img
  src={selectedImage || "/placeholder.png"}
  alt={product.name}
           className="
w-full

h-[360px]
sm:h-[500px]
lg:h-[650px]

object-cover

rounded-3xl
border

hover:scale-105
transition
duration-500
"
          />

          {product.images?.length > 0 && (
    <div className="flex gap-3 mt-5 flex-wrap">
      {product.images.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => setSelectedImage(image.imageUrl)}
          className={`border-2 rounded-xl overflow-hidden ${
            selectedImage === image.imageUrl
              ? "border-black"
              : "border-gray-300"
          }`}
        >
          <img
            src={image.imageUrl}
            alt=""
            className="w-20 h-20 object-cover"
          />
        </button>
      ))}
    </div>
  )}

</div>

        {/* Details */}

        <div>

          <p className="uppercase tracking-widest text-gray-500
text-sm
lg:text-base
font-semibold">
            {product.brand}
          </p>

          <h1 className="text-3xl
lg:text-5xl font-bold mt-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-5">

            {[...Array(5)].map((_, index) => (

              <FiStar
                key={index}
                size={20}
                className={
                  index <
                  Math.round(product.rating || 5)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />

            ))}

            <span className="ml-3 text-gray-600">
              ({product.rating || 5})
            </span>

          </div>

    <div className="mt-8 flex items-center gap-5">

  <span className="text-3xl lg:text-5xl font-bold">
    ₹{finalPrice}
  </span>

  {discount > 0 && (
    <span className="text-lg lg:text-2xl text-gray-400 line-through">
      ₹{product.price}
    </span>
  )}

</div>

          {save > 0 && (
            <p className="text-green-600 font-semibold mt-3">
              You Save ₹{save}
            </p>
          )}

          <p className="mt-6
lg:mt-8

text-gray-600

leading-7
lg:leading-8">
            {product.description}
          </p>

          {/* Size */}

          <div className="mt-10">

            <h3 className="font-semibold mb-4">
              Select Size
            </h3>

           <div className="flex flex-wrap gap-3">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`w-12 h-12 rounded-xl border font-semibold transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* Quantity */}

          <div className="mt-10">

            <h3 className="font-semibold mb-4">
              Quantity
            </h3>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="w-10 h-10 border rounded-lg flex items-center justify-center"
              >
                <FiMinus />
              </button>

              <span className="text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(product.stock, q + 1)
                  )
                }
                className="w-10 h-10 border rounded-lg flex items-center justify-center"
              >
                <FiPlus />
              </button>

            </div>

          </div>

          {/* Product Info */}

          <div className="grid
grid-cols-2
gap-3
lg:gap-5 gap-5 mt-10">

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Category
              </p>

              <h3 className="font-bold mt-2">
                {product.category?.name}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Fit
              </p>

              <h3 className="font-bold mt-2">
                {product.fit}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Stock
              </p>

              <h3
                className={`font-bold mt-2 ${
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} Available`
                  : "Out Of Stock"}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Gender
              </p>

              <h3 className="font-bold mt-2">
                {product.gender}
              </h3>
            </div>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAddToCart}
              disabled={adding || product.stock <= 0}
              className="flex-1 bg-black text-white py-3
lg:py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 disabled:opacity-50"
            >
              <FiShoppingCart />

              {adding
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="w-16 border rounded-xl flex items-center justify-center hover:bg-gray-100"
            >
              <FiHeart size={22} />
            </button>

          </div>

          <div className="mt-12 space-y-4">

            <div className="flex items-center gap-4">
              <FiTruck className="text-green-600" />
              <span>Free Delivery Available</span>
            </div>

            <div className="flex items-center gap-4">
              <FiRefreshCw className="text-blue-600" />
              <span>7 Days Easy Return</span>
            </div>

            <div className="flex items-center gap-4">
              <FiShield className="text-purple-600" />
              <span>100% Secure Checkout</span>
            </div>

          </div>

        </div>

      </div>
            {/* Reviews */}

      <div className="mt-20">

        <ReviewSection
          productId={product.id}
          currentUserId={currentUser?.id}
        />

      </div>

      {/* Related Products */}

      <div className="mt-20">

       {/* 
<ReviewSection
  productId={product.id}
  currentUserId={currentUser?.id}
/> 
*/}
      </div>

      {/* Recently Viewed */}

      <RecentlyViewed />

    

    </div>
  );
}

export default ProductDetails;