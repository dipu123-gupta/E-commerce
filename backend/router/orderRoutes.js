import express from "express";
import { verifyUser, roleBasedAccess } from "../middleware/userAuth.js";
import {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controller/orderController.js";

const router = express.Router();

// Create Order
router.post("/new/order", verifyUser, createOrder);

// Get My Orders
router.get("/orders/user", verifyUser, myOrders);

// Get Single Order (Admin)
router.get(
  "/admin/order/:id",
  verifyUser,
  roleBasedAccess("admin"),
  getSingleOrder,
);

// Update Order Status (Admin)
router.put(
  "/admin/order/:id",
  verifyUser,
  roleBasedAccess("admin"),
  updateOrderStatus,
);

// Delete Order (Admin)
router.delete(
  "/admin/order/:id",
  verifyUser,
  roleBasedAccess("admin"),
  deleteOrder,
);

// Get All Orders (Admin)
router.get("/admin/orders", verifyUser, roleBasedAccess("admin"), getAllOrders);

export default router;
