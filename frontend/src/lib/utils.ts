import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Product } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateProductFormDefaults = (
  isEditForm: boolean,
  product: Product | undefined
) => ({
  brand: isEditForm ? product!.brand : "",
  name: isEditForm ? product!.name : "",
  price: isEditForm ? product!.price : (undefined as unknown as number),
  description: isEditForm ? product!.description : "",
  imageUrl: isEditForm ? product!.imageUrl : "",
  category: {
    name: isEditForm ? product!.category.name : "",
    id: isEditForm ? product!.category.id : (undefined as unknown as number),
  },
});
