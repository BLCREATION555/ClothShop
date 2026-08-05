import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useSearch } from "../context/SearchContext";
import { getAllProducts } from "../services/product.service";

const PRODUCTS_PER_PAGE = 9;

function Men() {
  const { search } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {

    let data = [...products];
    data = data.map((p) => {
  const discount = p.discountPrice || 0;

  return {
    ...p,
    finalPrice:
      discount > 0
        ? Math.round(
            p.price * (1 - discount / 100)
          )
        : p.price,
  };
});

    // MEN PRODUCTS

    data = data.filter(
      (p) => p.gender?.toUpperCase() === "MEN"
    );

    // SEARCH

    if (search.trim()) {

      const keyword = search.toLowerCase();

      data = data.filter(
        (p) =>
          p.name?.toLowerCase().includes(keyword) ||
          p.brand?.toLowerCase().includes(keyword) ||
          p.fit?.toLowerCase().includes(keyword)
      );
    }

    // PRICE

    data = data.filter(
      (p) =>
      p.finalPrice <= maxPrice
    );

    // RATING

    if (selectedRating > 0) {

      data = data.filter(
        (p) =>
          Number(p.rating || 0) >= selectedRating
      );

    }

    // SIZE

    if (selectedSize) {

      data = data.filter((p) => {

        if (Array.isArray(p.sizes)) {
          return p.sizes.includes(selectedSize);
        }

        if (typeof p.size === "string") {
          return p.size === selectedSize;
        }

        return true;

      });

    }

    switch (sortOption) {

      case "low":

        data.sort(
          (a, b) =>
         a.finalPrice - b.finalPrice
        );

        break;

      case "high":

        data.sort(
          (a, b) =>
         b.finalPrice - a.finalPrice
        );

        break;

      case "new":

        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        break;

      case "featured":

        data.sort(
          (a, b) =>
            Number(b.isFeatured) -
            Number(a.isFeatured)
        );

        break;

      default:
        break;

    }

    return data;

  }, [
    products,
    search,
    sortOption,
    maxPrice,
    selectedSize,
    selectedRating,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    sortOption,
    maxPrice,
    selectedSize,
    selectedRating,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl font-bold">
        Loading Products...
      </div>
    );
  }
    return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Men's Collection
        </h1>

        <span className="hidden lg:block text-gray-500 font-medium">
          {filteredProducts.length} Products
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
          {filteredProducts.length} Products
        </span>

      </div>

      {/* Mobile Drawer */}

      {showFilters && (

        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />

          {/* Drawer */}

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

      {/* Desktop Layout */}

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

            {paginatedProducts.length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-2xl font-semibold text-gray-500">
                  No Products Found
                </h2>

                <p className="text-gray-400 mt-2">
                  Try changing your filters or search.
                </p>

              </div>

            ) : (

              paginatedProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            )}

          </div>
                    {/* Pagination */}

          {totalPages > 1 && (

            <div className="flex justify-center gap-3 mt-10 flex-wrap">

              {Array.from(
                { length: totalPages },
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === index + 1
                        ? "bg-black text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Men;