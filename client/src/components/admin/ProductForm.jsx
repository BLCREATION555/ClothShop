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
  const preview = useMemo(() => {
    if (!formData.image) return null;

    if (typeof formData.image === "string") {
      return formData.image;
    }

    return URL.createObjectURL(formData.image);
  }, [formData.image]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-8"
    >
      {/* Image */}

      <div>

        <label className="block font-semibold mb-3">
          Product Image
        </label>

        <label className="border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-black transition">

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl"
            />

          ) : (

            <>
              <FiUpload
                size={45}
                className="text-gray-400 mb-4"
              />

              <p className="text-gray-500">
                Click to upload image
              </p>
            </>

          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

        </label>

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

      <div className="grid lg:grid-cols-2 gap-6">

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

      </div>

      {/* Featured */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="w-5 h-5"
        />

        <span className="font-medium">
          Featured Product
        </span>

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