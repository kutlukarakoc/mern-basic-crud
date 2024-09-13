import type { ProductFormValues } from "@/schemas/product-form-schema";

export const createProduct = async (product: ProductFormValues) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(product),
  });
  
  return response.json();
};
