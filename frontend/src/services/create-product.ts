import axios from "axios";

import type { ProductFormValues } from "@/schemas/product-form-schema";

export const createProduct = async (product: ProductFormValues) => {
  const response = await axios("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: product,
  });

  return response.data;
};
