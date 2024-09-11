import mongoose from "mongoose";

export const validateProduct = (product) => {
  if (!product) return false;

  const requiredFields = [
    "brand",
    "name",
    "price",
    "description",
    "imageUrl",
    "category.id",
    "category.name",
  ];

  for (const field of requiredFields) {
    const keys = field.split(".");
    let value = product;

    for (const key of keys) {
      if (!value[key]) {
        return false;
      }
      value = value[key];
    }
  }

  return true;
};

export const valiteID = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
