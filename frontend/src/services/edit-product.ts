import axios from "axios";

import type { ProductFormValues } from "@/schemas/product-form-schema";

export const editProduct = async (id: string, product: ProductFormValues) => {
  const response = await axios(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: product,
  });
  return response.data;
};
