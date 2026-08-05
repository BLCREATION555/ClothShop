const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  description: z.string().min(5, "Description is required"),

  // Image will be uploaded through Cloudinary
  // so we don't validate it here.

  price: z.coerce.number().positive("Price must be greater than 0"),

discountPrice: z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === "0" ||
      value === 0 ||
      value === null
    ) {
      return undefined;
    }

    return value;
  },
  z.coerce.number().positive().optional()
),

  brand: z.string().min(2, "Brand is required"),

  gender: z.enum(["MEN", "WOMEN", "KIDS"]),

  fit: z.string().min(2, "Fit is required"),

  rating: z.coerce.number().min(1).max(5).optional(),

  stock: z.coerce.number().int().min(0),

 const booleanField = z.preprocess(
  (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  },
  z.boolean().optional()
);
isFeatured: booleanField,
isNewArrival: booleanField,
isTrending: booleanField,
isBestSeller: booleanField,
isOnSale: booleanField,
  categoryId: z.string().min(1, "Category is required"),
});

const updateProductSchema = createProductSchema.partial();

module.exports = {
  createProductSchema,
  updateProductSchema,
};