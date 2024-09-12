import { Products } from "@/types/product";

export const getProducts = async () => {
  try {
    const response = await fetch("/api/products");
    const data: Products = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
