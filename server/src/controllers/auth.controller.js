const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");

// ======================
// Register
// ======================

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      user,
      "User registered successfully."
    )
  );
});

// ======================
// Login
// ======================

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    token: result.token,
    user: result.user,
  });
});

// ======================
// Get Profile
// ======================

const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile fetched successfully."
    )
  );
});

// ======================
// Update Profile
// ======================

const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateUserProfile(
    req.user.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile updated successfully."
    )
  );
});

// ======================
// Change Password
// ======================

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Password changed successfully."
    )
  );
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
};