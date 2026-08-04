import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";
import SectionTitle from "./SectionTitle";
import { getAllProducts } from "../services/product.service";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      const featuredProducts = Array.isArray(data)
        ? data.filter((product) => product.isFeatured)
        : [];

      setProducts(featuredProducts);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section
        id="featured-products"
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 text-center text-lg">
          Loading featured products...
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-products"
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Featured Products"
          subtitle="Discover our premium collection of BL CREATION."
        />

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No featured products available.
          </div>
        ) : (
      <>
  {/* Mobile Slider */}
  <div className="lg:hidden">
 <Swiper
  modules={[FreeMode]}
  freeMode
  spaceBetween={14}
  breakpoints={{
    0: {
      slidesPerView: 1.15,
    },
    480: {
      slidesPerView: 1.35,
    },
    640: {
      slidesPerView: 1.6,
    },
  }}
  className="!pl-4 pb-4"
>
      {products.map((product) => (
       <SwiperSlide key={product.id} className="!h-auto">
  <div className="h-full">
    <ProductCard product={product} />
  </div>
</SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Desktop Grid */}
  <div className="hidden lg:grid grid-cols-4 gap-8">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}
  </div>
</>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;