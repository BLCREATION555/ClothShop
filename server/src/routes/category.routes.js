const express = require("express");

const {
  createCategory,
  getCategories,
} = require("../controllers/category.controller");

const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

// Public Route
router.get("/", getCategories);

// Admin Routes
router.post("/", protect, isAdmin, createCategory);

module.exports = router;