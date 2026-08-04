const validate = (schema) => {
  return (req, res, next) => {
    console.log("======================================");
    console.log("✅ Validation Middleware Executed");
    console.log("Request Body:", req.body);
    console.log("======================================");

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};

module.exports = validate;