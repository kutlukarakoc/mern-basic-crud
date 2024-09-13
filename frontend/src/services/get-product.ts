import axios from "axios";

import type { Product } from "@/types/product";

export const getProduct = async (id: string) => {
  const response = await axios(`/api/products/${id}`);
  return response.data.data as Product;
}