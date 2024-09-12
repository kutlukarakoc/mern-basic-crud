import axios from "axios";

import type { SingleProductResponse } from "@/types/single-product-response";

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`/api/products/${id}`);
  return response.data as SingleProductResponse;
};
