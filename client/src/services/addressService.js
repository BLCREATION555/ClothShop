import axios from "axios";

const API = axios.create({
  baseURL: "https://blcreation-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all addresses
export const getAddresses = async () => {
  const { data } = await API.get("/addresses");
  return data;
};

// Create address
export const createAddress = async (address) => {
  const { data } = await API.post("/addresses", address);
  return data;
};

// Update address
export const updateAddress = async (id, address) => {
  const { data } = await API.patch(`/addresses/${id}`, address);
  return data;
};

// Delete address
export const deleteAddress = async (id) => {
  const { data } = await API.delete(`/addresses/${id}`);
  return data;
};