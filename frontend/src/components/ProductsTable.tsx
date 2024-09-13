import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Products } from "@/types/products";
import { DeleteProduct } from "./DeleteProduct";
import { EditOrCreateProduct } from "./edit-create";

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
          <TableHead className="text-right">Actions</TableHead>
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
