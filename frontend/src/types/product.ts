import type { Category } from "./category";

export type Product = {
  category: Category;
  _id: string;
  brand: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
