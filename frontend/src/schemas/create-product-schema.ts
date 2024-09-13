import { z } from "zod";

export const createProductSchema = z.object({
  brand: z.string().min(1, {
    message: "Brand is required.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  price: z.number({
    required_error: "Price is required.",
    invalid_type_error: "Price must be a number.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  imageUrl: z
    .string()
    .min(1, {
      message: "Image URL is required.",
    })
    .url({
      message: "Image URL is not valid.",
    }),
  category: z
    .object({
      name: z.string(),
      id: z.number(),
    })
    .refine((val) => val.name !== "" || val.id <= 0, {
      message: "Category is required.",
    }),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;
