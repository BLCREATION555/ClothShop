const express = require("express");
const router = express.Router();

const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createAddressSchema,
  updateAddressSchema,
} = require("../validators/address.validator");

// Create Address
router.post(
  "/",
  protect,
  validate(createAddressSchema),
  createAddress
);

// Get All Addresses
router.get("/", protect, getAllAddresses);

// Get Address By ID
router.get("/:id", protect, getAddressById);

// Update Address
router.patch(
  "/:id",
  protect,
  validate(updateAddressSchema),
  updateAddress
);

// Delete Address
router.delete("/:id", protect, deleteAddress);

module.exports = router;