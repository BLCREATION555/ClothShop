const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 BL CREATION API Running Successfully",
  });
});

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/products", require("./routes/product.routes"));

app.use("/api/categories", require("./routes/category.routes"));

app.use("/api/cart", require("./routes/cart.routes"));

app.use("/api/wishlist", require("./routes/wishlist.routes"));

app.use("/api/addresses", require("./routes/address.routes"));

app.use("/api/orders", require("./routes/order.routes"));

app.use("/api/invoice", require("./routes/invoice.routes"));

app.use("/api/reviews", require("./routes/review.routes"));

app.use("/api/contact", require("./routes/contact.routes"));

app.use("/api/payments", require("./routes/payment.routes"));

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/admin/dashboard",
  require("./routes/dashboard.routes")
);

app.use(
  "/api/admin/orders",
  require("./routes/order.admin.routes")
);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});