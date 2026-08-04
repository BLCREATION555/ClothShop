import api from "./api";

// ======================
// Login
// ======================

export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// ======================
// Register
// ======================

export const registerUser = async (registerData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};

// ======================
// Get Profile
// ======================

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// ======================
// Update Profile
// ======================

export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  );

  return response.data;
};

// ======================
// Change Password
// ======================

export const changePassword = async (
  passwordData
) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};