import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";
import { getAllProducts } from "../services/product.service";

function RelatedProducts({
  currentProductId,
  categoryId,
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [currentProductId]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      const related = data
        .filter(
          (item) =>
            item.id !== currentProductId &&
            item.categoryId === categoryId
        )
        .slice(0, 4);

      setProducts(related);
    } catch (err) {
      console.error(err);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="mt-24">

      <h2 className="text-4xl font-bold mb-10">
        You May Also Like
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default RelatedProducts;