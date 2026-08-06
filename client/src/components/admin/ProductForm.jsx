import { useMemo } from "react";
import { FiUpload } from "react-icons/fi";

function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  categories,
  buttonText,
  loading = false,
}) {
const previews = useMemo(() => {
  if (!formData.images || formData.images.length === 0) return [];

  return Array.from(formData.images).map((file) => {
    // Existing image from database
    if (file?.imageUrl) {
      return file.imageUrl;
    }

    // Already a URL string
    if (typeof file === "string") {
      return file;
    }

    // Newly selected image
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }

    return "";
  });
}, [formData.images]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-8"
    >
{/* Images */}

<div>

  <label className="block font-semibold mb-3">
    Product Images
  </label>

  <input
    type="file"
    name="images"
    multiple
    accept="image/*"
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />

  {previews.length > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
      {previews.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className="w-full h-36 object-cover rounded-xl border"
        />
      ))}
    </div>
  )}

</div>

      {/* Basic */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block font-semibold mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="block font-semibold mb-2">
          Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
          required
        />

      </div>

      {/* Price */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block font-semibold mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Discount Price
          </label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

        </div>

      </div>

      {/* Category */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div>

          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="MEN">
              Men
            </option>

            <option value="KIDS">
              Kids
            </option>

          </select>

        </div>

      </div>

      {/* Stock */}

<div className="grid lg:grid-cols-3 gap-6">

  <div>

    <label className="block font-semibold mb-2">
      Fit
    </label>

    <input
      type="text"
      name="fit"
      value={formData.fit}
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
      required
    />

  </div>

  <div>

    <label className="block font-semibold mb-2">
      Stock
    </label>

    <input
      type="number"
      name="stock"
      value={formData.stock}
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
      required
    />

  </div>

  <div>

    <label className="block font-semibold mb-2">
      Rating
    </label>

    <input
      type="number"
      name="rating"
      min="1"
      max="5"
      value={formData.rating}
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
      required
    />

  </div>

</div>

 <div className="grid md:grid-cols-2 gap-4">

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      name="isFeatured"
      checked={formData.isFeatured}
      onChange={handleChange}
      className="w-5 h-5"
    />
    Featured Product
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      name="isNewArrival"
      checked={formData.isNewArrival}
      onChange={handleChange}
      className="w-5 h-5"
    />
    New Arrival
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      name="isTrending"
      checked={formData.isTrending}
      onChange={handleChange}
      className="w-5 h-5"
    />
    Trending
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      name="isBestSeller"
      checked={formData.isBestSeller}
      onChange={handleChange}
      className="w-5 h-5"
    />
    Best Seller
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      name="isOnSale"
      checked={formData.isOnSale}
      onChange={handleChange}
      className="w-5 h-5"
    />
    On Sale
  </label>

</div>

      {/* Submit */}

      <button
        disabled={loading}
        className="w-full bg-black hover:bg-gray-900 disabled:opacity-50 text-white py-4 rounded-xl text-lg font-semibold transition"
      >
        {buttonText}
      </button>

    </form>
  );
}
export default ProductForm;