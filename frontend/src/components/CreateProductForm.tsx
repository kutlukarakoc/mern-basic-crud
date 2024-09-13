import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  CreateProductForm as FormType,
} from "@/schemas/create-product-schema";

import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/create-product";

import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/error-response";
import type { Product } from "@/types/product";

import { categories } from "@/constants/categories";

type CreateProductFormProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateProductForm = ({ setShowModal }: CreateProductFormProps) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (product: FormType) => createProduct(product),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data.message || "An error occurred";
      toast({
        description: message,
        variant: "destructive",
      });
    },
    onSuccess: (data: {
      data: Product;
      message: string;
      status: "success" | "error";
    }) => {
      if (data.message === "success") {
        toast({ description: data.message, variant: "success" });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setShowModal(false);
        return;
      }

      toast({ description: data.message, variant: "destructive" });
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      brand: "",
      name: "",
      price: undefined as unknown as number,
      description: "",
      imageUrl: "",
      category: {
        name: "",
        id: undefined as unknown as number,
      },
    },
  });

  const onSubmit = (values: FormType) => mutate(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Apple" {...field} />
                </FormControl>
                <FormDescription>Please enter Brand</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Iphone 14" {...field} />
                </FormControl>
                <FormDescription>Please enter Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="10"
                    {...field}
                    onChange={(e) =>
                      form.setValue("price", Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>Please enter Price</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("category", {
                        name: value.split("__")[0],
                        id: Number(value.split("__")[1]),
                      });
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={`${category.name}__${category.id}`}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Please enter Category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://images.unsplash.com/photo..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter Image URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="iPhone 14 offers a sleek design with..."
                  rows={4}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="float-right">
          Create
        </Button>
      </form>
    </Form>
  );
};
