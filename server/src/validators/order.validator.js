const { z } = require("zod");

const createOrderSchema = z.object({
  addressId: z
    .string()
    .min(1, "Address ID is required."),
});

const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};