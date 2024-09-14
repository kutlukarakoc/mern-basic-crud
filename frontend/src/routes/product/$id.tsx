import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

import { getProduct } from "@/services/get-product";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  if (!data) return <div>Not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <img src={data.imageUrl} alt={data.name} className="max-w-[500px]" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{data.brand}</p>
            <p className="text-2xl font-semibold mb-4">${data.price}</p>
            <p className="text-gray-700 mb-6">{data.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Category: {data.category.name}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
