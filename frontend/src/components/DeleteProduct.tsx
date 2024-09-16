import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { LoaderCircle, Trash } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "@/services/delete-product";

import type { AxiosError } from "axios";
import type { Product } from "@/types/product";
import type { ErrorResponse } from "@/types/error-response";

type DeleteProductProps = {
  product: Product;
};

export const DeleteProduct = ({ product }: DeleteProductProps) => {
  const { _id, brand, name } = product;

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(_id),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data.message || "An error occurred";
      toast({
        description: message,
        variant: "destructive",
      });
    },
    onSuccess: (data: { data: Product; message: string }) => {
      toast({ description: data.message, variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {brand} - {name} will permanently
            delete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
            {isPending && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
