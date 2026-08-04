function FilterSidebar({
  sortOption,
  setSortOption,
  maxPrice,
  setMaxPrice,
  selectedSize,
  setSelectedSize,
  selectedRating,
  setSelectedRating,
}) {
  const clearFilters = () => {
    setSortOption("");
    setMaxPrice(5000);
    setSelectedSize("");
    setSelectedRating(0);
  };

  return (
    <aside className="bg-white rounded-2xl shadow border p-6 sticky top-24">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear
        </button>

      </div>

      {/* Sort */}

      <div className="mb-8">

        <label className="block font-semibold mb-3">
          Sort By
        </label>

        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value)
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            Default
          </option>

          <option value="featured">
            Featured
          </option>

          <option value="new">
            Newest
          </option>

          <option value="low">
            Price: Low → High
          </option>

          <option value="high">
            Price: High → Low
          </option>

        </select>

      </div>

      {/* Price */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <label className="font-semibold">
            Max Price
          </label>

          <span className="font-bold">
            ₹{maxPrice}
          </span>

        </div>

        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="w-full"
        />

      </div>

      {/* Size */}

      <div className="mb-8">

        <label className="block font-semibold mb-3">
          Size
        </label>

        <div className="grid grid-cols-2 gap-3">

          {["S", "M", "L", "XL"].map((size) => (

            <button
              key={size}
              onClick={() =>
                setSelectedSize(
                  selectedSize === size
                    ? ""
                    : size
                )
              }
              className={`border rounded-xl py-2 font-medium transition ${
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

      {/* Rating */}

      <div className="mb-8">

        <label className="block font-semibold mb-3">
          Rating
        </label>

        <select
          value={selectedRating}
          onChange={(e) =>
            setSelectedRating(
              Number(e.target.value)
            )
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="0">
            All Ratings
          </option>

          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>

          <option value="4">
            ⭐⭐⭐⭐ & Up
          </option>

          <option value="3">
            ⭐⭐⭐ & Up
          </option>

          <option value="2">
            ⭐⭐ & Up
          </option>

          <option value="1">
            ⭐ & Up
          </option>

        </select>

      </div>

      {/* Active Filters */}

      <div className="border-t pt-6">

        <h3 className="font-semibold mb-3">
          Active Filters
        </h3>

        <div className="flex flex-wrap gap-2">

          {selectedSize && (
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
              {selectedSize}
            </span>
          )}

          {selectedRating > 0 && (
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
              {selectedRating}+ ⭐
            </span>
          )}

          {maxPrice !== 5000 && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              ₹{maxPrice}
            </span>
          )}

        </div>

      </div>

    </aside>
  );
}

export default FilterSidebar;