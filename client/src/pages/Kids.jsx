import { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { getAllProducts } from "../services/product.service";
import { useSearch } from "../context/SearchContext";

function Kids() {
  const { search } = useSearch();

  const [sortOption, setSortOption] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const data = await getAllProducts();
    setProducts(data);
  } catch (err) {
    console.error(err);
  }
};

  let kidsProducts = products.filter(
    (product) =>
      product.gender?.toUpperCase() === "KIDS" &&
      product.price <= maxPrice &&
      product.rating >= selectedRating &&
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      selectedSize === ""
  );

  if (sortOption === "low") {
    kidsProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high") {
    kidsProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Kids Collection
        </h1>

        <span className="hidden lg:block text-gray-500 font-medium">
          {kidsProducts.length} Products
        </span>

      </div>

      {/* Mobile Top Bar */}

      <div className="lg:hidden flex justify-between items-center mb-6">

        <button
          onClick={() => setShowFilters(true)}
          className="bg-black text-white px-5 py-3 rounded-xl font-semibold"
        >
          ☰ Filter
        </button>

        <span className="text-gray-600 font-medium">
          {kidsProducts.length} Products
        </span>

      </div>

      {/* Mobile Filter Drawer */}

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl overflow-y-auto">

            <div className="flex justify-between items-center p-5 border-b">

              <h2 className="text-2xl font-bold">
                Filters
              </h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-3xl"
              >
                ×
              </button>

            </div>

            <div className="p-5">

              <FilterSidebar
                sortOption={sortOption}
                setSortOption={setSortOption}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />

            </div>

          </div>

        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Desktop Filter */}

        <div className="hidden lg:block">

          <FilterSidebar
            sortOption={sortOption}
            setSortOption={setSortOption}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

        </div>

        {/* Products */}

        <div className="lg:col-span-3">

          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

            {kidsProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Kids;