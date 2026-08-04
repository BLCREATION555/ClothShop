import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/adminOrderService";

function TopSellingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const res = await getAllOrders();

      const orders = res.data || [];

      const map = {};

      orders.forEach((order) => {
        order.orderItems?.forEach((item) => {
          if (!map[item.product.id]) {
            map[item.product.id] = {
              id: item.product.id,
              name: item.product.name,
              image: item.product.image,
              sold: 0,
              revenue: 0,
            };
          }

          map[item.product.id].sold += item.quantity;
          map[item.product.id].revenue +=
            item.quantity * item.price;
        });
      });

      const topProducts = Object.values(map)
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

      setProducts(topProducts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Selling Products
      </h2>

      {products.length === 0 ? (
        <div className="text-gray-500">
          No sales yet.
        </div>
      ) : (
        <div className="space-y-5">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-gray-500">
                    Sold: {product.sold}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  ₹{product.revenue.toLocaleString("en-IN")}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default TopSellingProducts;