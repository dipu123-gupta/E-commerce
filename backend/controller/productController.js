import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import { handleAsyncError } from "../middleware/handleAsynError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// =======================================================
// ✅ CREATE PRODUCT
// =======================================================
export const createProduct = handleAsyncError(async (req, res, next) => {
  // Product ko create karne wale user ka id attach kar rahe hain
  req.body.user = req.user.id;

  // Request body se required fields nikal rahe hain
  const { name, description, price, category, stock } = req.body;

  // Check kar rahe hain ki sab required fields bhare gaye hain ya nahi
  if (!name || !description || !price || !category || !stock) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  // Database me product create kar rahe hain
  const product = await productModel.create(req.body);

  // Success response bhej rahe hain
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// =======================================================
// ✅ UPDATE PRODUCT
// =======================================================
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Pehle check karte hain product exist karta hai ya nahi
  const product = await productModel.findById(id);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  // Product ko update kar rahe hain
  const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    new: true, // Updated product return karega
    runValidators: true, // Validation rules apply honge
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    updatedProduct,
  });
});

// =======================================================
// ✅ DELETE PRODUCT
// =======================================================
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check product exist karta hai ya nahi
  const product = await productModel.findById(id);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }

  // Product delete kar rahe hain
  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// =======================================================
// ✅ GET ALL PRODUCTS (Search + Filter + Pagination)
// =======================================================
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 3; // Har page me 3 products

  // Search + filter functionality apply kar rahe hain
  const apiFeature = new APIFunctionality(productModel.find(), req.query)
    .search()
    .filter();

  // Total filtered products count nikal rahe hain
  const filteredQuery = apiFeature.query.clone();
  const productCount = await filteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultPerPage);
  const page = Number(req.query.page) || 1;

  // Agar page exist nahi karta to error
  if (page > totalPages && productCount > 0) {
    return next(new HandleError("Page not found", 404));
  }

  // Pagination apply kar rahe hain
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

// =======================================================
// ✅ GET SINGLE PRODUCT
// =======================================================
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

// =======================================================
// ✅ CREATE / UPDATE REVIEW
// =======================================================
export const createProductReview = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  // Review object bana rahe hain
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  // Check kar rahe hain user ne pehle review diya hai ya nahi
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString(),
  );

  if (isReviewed) {
    // Agar review exist karta hai to update kar do
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Nahi diya to new review add karo
    product.reviews.push(review);
  }

  // Total reviews count update
  product.numOfReviews = product.reviews.length;

  // Average rating calculate
  let sum = 0;
  product.reviews.forEach((rev) => {
    sum += rev.rating;
  });

  product.ratings = product.reviews.length ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review created successfully",
  });
});

// =======================================================
// ✅ GET PRODUCT REVIEWS
// =======================================================
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const { id } = req.query;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    message: "Reviews fetched successfully",
    reviews: product.reviews,
  });
});

// =======================================================
// ✅ DELETE REVIEW
// =======================================================
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const { productId, reviewId } = req.query;

  const product = await productModel.findById(productId);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  // Review filter karke remove kar rahe hain
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== reviewId.toString(),
  );

  // Rating dubara calculate kar rahe hain
  let sum = 0;
  reviews.forEach((rev) => {
    sum += rev.rating;
  });

  const ratings = reviews.length ? sum / reviews.length : 0;

  const numOfReviews = reviews.length;

  // Updated review data save kar rahe hain
  await productModel.findByIdAndUpdate(
    productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// =======================================================
// ✅ ADMIN - GET ALL PRODUCTS
// =======================================================
export const adminGetAllProducts = handleAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  if (products.length === 0) {
    return next(new HandleError("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});
