import express from "express";
import {
  adminGetAllProducts,
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";

import { roleBasedAccess, verifyUser } from "../middleware/userAuth.js";

const router = express.Router();
//@ login user to access all products
router.get("/products", verifyUser, getAllProducts);
//@ login admin to create products
router.post(
  "/admin/product/create",
  verifyUser,
  roleBasedAccess("admin"),
  createProduct,
);
router.put(
  "/admin/products/:id",
  verifyUser,
  roleBasedAccess("admin"),
  updateProduct,
);
//@ login admin to delete products
router.delete(
  "/admin/products/:id",
  verifyUser,
  roleBasedAccess("admin"),
  deleteProduct,
);

router.get("/products/:id", verifyUser, getSingleProduct);

router.get(
  "/admin/products",
  verifyUser,
  roleBasedAccess("admin"),
  adminGetAllProducts,
);

router.post("/review", verifyUser, createProductReview);

router.get("/reviews", getProductReviews);

router.delete("/reviews", verifyUser, deleteReview);
export default router;
// @route   GET /api/v1/products
