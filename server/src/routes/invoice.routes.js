const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  downloadInvoice,
} = require("../controllers/invoice.controller");

router.get(
  "/:id",
  protect,
  downloadInvoice
);

module.exports = router;