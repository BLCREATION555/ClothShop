const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("\n========== AUTH DEBUG ==========");
  console.log("Headers:", req.headers);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);
    console.log("========== SUCCESS ==========\n");

    req.user = decoded;

    next();
  } catch (error) {
    console.log("========== JWT ERROR ==========");
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log(error);
    console.log("===============================\n");

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  next();
};

module.exports = {
  protect,
  isAdmin,
};