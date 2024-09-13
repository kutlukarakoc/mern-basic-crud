import type { ProductFormValues } from "@/schemas/product-form-schema";

export const editProduct = async (id: string, product: ProductFormValues) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};
