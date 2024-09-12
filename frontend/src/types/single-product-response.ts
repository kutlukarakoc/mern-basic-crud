import { Product } from "./product";
import type { Status } from "./status";

export type SingleProductResponse = {
  status: Status;
  data: Product;
  message: string;
}