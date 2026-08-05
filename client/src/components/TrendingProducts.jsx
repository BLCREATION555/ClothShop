import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";
import SectionTitle from "./SectionTitle";
import { getAllProducts } from "../services/product.service";

function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

console.log("Trending:", data);

      const trending = [...data]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

      setProducts(trending);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Trending Products"
          subtitle="Most loved by our customers."
        />

      <>
  {/* Desktop */}
  <div className="hidden lg:grid grid-cols-4 gap-8 mt-12">

    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}

  </div>

  {/* Mobile */}
  <div className="lg:hidden mt-10">

    <Swiper
      slidesPerView={1.25}
      spaceBetween={16}
    >
      {products.map((product) => (

        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>

      ))}
    </Swiper>

  </div>
</>

      </div>

    </section>
  );
}

export default TrendingProducts;