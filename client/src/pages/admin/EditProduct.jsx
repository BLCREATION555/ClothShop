import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../../services/adminProduct.service";

import { getAllCategories } from "../../services/category.service";

function EditProduct() {
  const { id } = useParams();
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

  isFeatured: false,
  isNewArrival: false,
  isTrending: false,
  isBestSeller: false,
  isOnSale: false,

  categoryId: "",
});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoryRes, productRes] = await Promise.all([
        getAllCategories(),
        getProductById(id),
      ]);

      setCategories(
        categoryRes.categories ||
          categoryRes.data ||
          []
      );

      const product =
        productRes.data || productRes;

 setFormData({
  name: product.name || "",
  description: product.description || "",
  images: [],
  price: product.price || "",
  discountPrice: product.discountPrice || "",
  brand: product.brand || "",
  gender: product.gender || "MEN",
  fit: product.fit || "",
  stock: product.stock || "",

  isFeatured: !!product.isFeatured,
  isNewArrival: !!product.isNewArrival,
  isTrending: !!product.isTrending,
  isBestSeller: !!product.isBestSeller,
  isOnSale: !!product.isOnSale,

  categoryId: product.categoryId || "",
});
    } catch (err) {
      console.error(err);
      alert("Failed to load product.");
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

Object.entries(formData).forEach(([key, value]) => {
  if (key === "images") {
    if (value && value.length > 0) {
      Array.from(value).forEach((file) => {
        data.append("images", file);
      });
    }
  } else {
    data.append(key, value);
  }
});

      await updateProduct(id, data);

      alert(
        "✅ Product updated successfully!"
      );

      navigate("/admin/products");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Edit Product
        </h1>

        <p className="text-gray-500 mt-2">
          Update product information.
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
              ? "Updating..."
              : "Update Product"
          }
        />
      </div>
    </AdminLayout>
  );
}

export default EditProduct;