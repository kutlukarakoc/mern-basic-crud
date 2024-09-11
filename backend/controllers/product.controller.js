import Product from "../models/product.model.js";

import { validateProduct } from "../helpers/validation.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      message: "Products retrieved successfully.",
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.log("Error getting products:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occured while getting products.",
    });
  }
};

export const getProductById = async (req, res) => {};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!validateProduct(product)) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error creating product:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occured while creating product.",
    });
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
