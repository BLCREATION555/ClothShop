import api from "./api";

// Get All Products
export const getAllProducts = async () => {
  const response = await api.get("/products");

  console.log("PRODUCT RESPONSE:", response.data);

  return response.data.data;
};

// Get Single Product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data.data;
};

// Create Product (Admin)
export const createProduct = async (formData) => {
  const response = await api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Product (Admin)
export const updateProduct = async (id, formData) => {
  const response = await api.patch(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Product (Admin)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};