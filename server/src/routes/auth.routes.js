const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validator");

// ======================
// Public Routes
// ======================

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

// ======================
// Protected Routes
// ======================

router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;