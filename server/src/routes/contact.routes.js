const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getOne,
  read,
  remove,
} = require("../controllers/contact.controller");

const { protect, isAdmin } = require("../middleware/auth.middleware");

// Public
router.post("/", create);

// Admin
router.get("/", protect, isAdmin, getAll);

router.get("/:id", protect, isAdmin, getOne);

router.patch("/:id/read", protect, isAdmin, read);

router.delete("/:id", protect, isAdmin, remove);

module.exports = router;