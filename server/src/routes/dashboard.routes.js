const express = require("express");

const router = express.Router();

const { protect, isAdmin } = require("../middleware/auth.middleware");

const {
  getDashboard,
} = require("../controllers/dashboard.controller");

// Protect all dashboard routes
router.use(protect);
router.use(isAdmin);

// Dashboard Statistics
router.get("/", getDashboard);

module.exports = router;