import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";

import { createProduct } from "../../services/adminProduct.service";
import { getAllCategories } from "../../services/category.service";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    discountPrice: "",
    brand: "",
    gender: "MEN",
    fit: "",
    stock: "",
rating: 5,
   isFeatured: false,
isNewArrival: false,
isTrending: false,
isBestSeller: false,
isOnSale: false,
    categoryId: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();

      setCategories(
        res.categories ||
          res.data ||
          []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

  if (type === "file") {
  setFormData((prev) => ({
    ...prev,
    images: files,
  }));
  return;
}

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

Object.keys(formData).forEach((key) => {
  if (key === "images") {
    Array.from(formData.images).forEach((image) => {
      data.append("images", image);
    });
  } else if (
    key === "discountPrice" &&
    (!formData.discountPrice || Number(formData.discountPrice) <= 0)
  ) {
    // Don't send discountPrice if it's empty or 0
  } else {
    data.append(key, formData[key]);
  }
});
for (const pair of data.entries()) {
  console.log(pair[0], "=", pair[1]);
}

await createProduct(data);
      await createProduct(data);

      alert("✅ Product added successfully!");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to add product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Add Product
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new product for BL
          CREATION.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          categories={categories}
          loading={loading}
          buttonText={
            loading
              ? "Saving..."
              : "Save Product"
          }
        />
      </div>
    </AdminLayout>
  );
}
export default AddProduct;