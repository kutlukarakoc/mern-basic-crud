import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/getProducts";

import { ProductsTable } from "@/components/products-table";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home () {
  const { data, isLoading, isError } = useQuery({ queryKey: ['products'], queryFn: getProducts })
  
  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <div className="container mx-auto mt-10">
      <ProductsTable products={data} />
    </div>
  );
}