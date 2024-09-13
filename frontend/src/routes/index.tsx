import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/get-products";

import { ProductsTable } from "@/components/ProductsTable";
import { EditOrCreateProduct } from "@/components/edit-create";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between mb-10">
        <h3>My Products</h3>
        <EditOrCreateProduct format="create" />
      </div>
      <ProductsTable products={data} />
    </div>
  );
}
