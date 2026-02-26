import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import { handleAsyncError } from "../middleware/handleAsynError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

//! ✅ Create Product
export const createProduct = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const product = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

//! ✅ Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    updatedProduct,
  });
});

//! ✅ Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//! ✅ Get All Products (Search + Filter + Pagination)
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 3;

  const apiFeature = new APIFunctionality(productModel.find(), req.query)
    .search()
    .filter();

  //! Count after search + filter (before pagination)
  const filteredQuery = apiFeature.query.clone();
  const productCount = await filteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("Page not found", 404));
  }

  //! Apply pagination only once
  apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    productCount,
    totalPages,
    currentPage: page,
    products,
  });
});

//! ✅ Get Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});
