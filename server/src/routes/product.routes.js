const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const { protect, isAdmin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");

// =======================
// Public Routes
// =======================

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

// =======================
// Admin Routes
// =======================

router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  validate(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;