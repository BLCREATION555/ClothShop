const { z } = require("zod");

const createAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits"),

  address: z
    .string()
    .min(5, "Address is required"),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .optional(),

  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});

const updateAddressSchema = createAddressSchema.partial();

module.exports = {
  createAddressSchema,
  updateAddressSchema,
};