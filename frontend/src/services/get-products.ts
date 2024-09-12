import axios from "axios";

import { Products } from "@/types/products";

export const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data as Products;
};
