const express = require("express");

const {
  addWishlist,
  getUserWishlist,
  removeWishlist,
} = require("../controllers/wishlist.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  addToWishlistSchema,
} = require("../validators/wishlist.validator");

const router = express.Router();

// All wishlist routes are protected
router.use(protect);

// Add product to wishlist
router.post("/", validate(addToWishlistSchema), addWishlist);

// Get user's wishlist
router.get("/", getUserWishlist);

// Remove product from wishlist
router.delete("/:productId", removeWishlist);

module.exports = router;