import type { CreateProductForm } from "@/schemas/create-product-schema";

export const createProduct = async (product: CreateProductForm) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(product),
  });
  
  return response.json();
};
