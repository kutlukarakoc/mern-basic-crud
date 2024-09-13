import { ProductForm } from "./ProductForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

import { useState } from "react";

import type { Product } from "@/types/product";

type EditOrCreateProductProps = {
  format: "edit" | "create";
  product?: Product;
};

export const EditOrCreateProduct = ({
  format,
  product,
}: EditOrCreateProductProps) => {
  const [showModal, setShowModal] = useState(false);

  const title = format === "edit" ? "Edit Product" : "Create Product";
  const description =
    format === "edit"
      ? "Edit the form below to update the product."
      : "Fill in the form below to create a new product.";

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          variant={format === "edit" ? "outline" : "default"}
          size={format === "edit" ? "icon" : "default"}
        >
          {format === "edit" ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Create New Product
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ProductForm
          setShowModal={setShowModal}
          format={format}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
};
