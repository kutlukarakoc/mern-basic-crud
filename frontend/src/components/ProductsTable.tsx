import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { SquareArrowOutUpRight } from "lucide-react";

import { DeleteProduct } from "./DeleteProduct";
import { EditOrCreateProduct } from "./edit-create";

import type { Products } from "@/types/products";
import { Button } from "./ui/button";

type ProductsTableProps = {
  products: Products | undefined;
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Brand</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-52">Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products && products.data ? (
          products.data.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell className="text-right w-10">
                <div className="flex gap-2">
                  <EditOrCreateProduct format="edit" product={product} />
                  <DeleteProduct product={product} />
                  <Button asChild variant="outline" size="icon">
                    <Link to={`product/${product._id}`}>
                      <SquareArrowOutUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={24} className="text-center pt-10">
              No products found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
