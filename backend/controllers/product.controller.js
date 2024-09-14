import Product from "../models/product.model.js";

import { valiteID, validateProduct } from "../helpers/validation.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

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

export const getProductById = async (req, res) => {
  const id = req.params.id;

  if (!valiteID(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Product ID." });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found." });
    }

    res.status(200).json({
      status: "success",
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    console.log("Error getting product:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occured while getting product.",
    });
  }
};

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

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  if (!valiteID(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Product ID." });
  }

  if (!validateProduct(product)) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found." });
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occured while updating product.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (!valiteID(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Product ID." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found." });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (error) {
    console.log("Error deleting product:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occured while deleting product.",
    });
  }
};
