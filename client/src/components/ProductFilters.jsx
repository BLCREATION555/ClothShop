function ProductFilters({
  sortOption,
  setSortOption,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-5 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Filters
      </h2>

      <div className="mb-6">

        <label className="block font-semibold mb-2">
          Sort By
        </label>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          <option value="">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Maximum Price: ₹{maxPrice}
        </label>

        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />

      </div>

    </div>
  );
}

export default ProductFilters;