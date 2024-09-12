import type { Product } from "./product";
import type { Status } from "./status";

export type Products = {
  status: Status;
  data: Product[];
  total: number;
  message: string;
};
