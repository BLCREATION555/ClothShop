import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";

function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    setProducts(data);
  }, []);

  if (!products.length) return null;

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        Recently Viewed
      </h2>

     <>
  {/* Desktop */}
  <div className="hidden lg:grid grid-cols-4 gap-6">

    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}

  </div>

  {/* Mobile */}
  <div className="lg:hidden">

    <Swiper
      slidesPerView={1.25}
      spaceBetween={16}
      className="!pl-4 pb-4"
    >
      {products.map((product) => (

        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>

      ))}
    </Swiper>

  </div>
</>

    </section>
  );
}

export default RecentlyViewed;