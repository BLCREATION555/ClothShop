import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/adminProduct.service";

function LowStockProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      const all = res.data || [];

      setProducts(
        all.filter((product) => product.stock <= 5)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">
        Low Stock Products
      </h2>

      {products.length === 0 ? (
        <div className="text-green-600 font-semibold">
          ✅ All products are sufficiently stocked.
        </div>
      ) : (
        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-500">
                  {product.brand}
                </p>

              </div>

              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                {product.stock} Left
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default LowStockProducts;