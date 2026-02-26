import express from "express";
import {
  changePassword,
  deleteUser,
  getSingleUser,
  getUserDetails,
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
  requestResetPassword,
  resetPassword,
  updateUserDetails,
  updateUserRole,
} from "../controller/userController.js";
import { roleBasedAccess, verifyUser } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/password/forgot", requestResetPassword);
router.post("/reset/:token", resetPassword);
router.post("/change-password", verifyUser, changePassword);
router.get("/profile", verifyUser, getUserDetails);
router.post("/profile/update", verifyUser, updateUserDetails);
router.get("admin/users", verifyUser, roleBasedAccess("admin"), getUserList);
router.get(
  "/admin/user/:id",
  verifyUser,
  roleBasedAccess("admin"),
  getSingleUser,
);
router.put(
  "/admin/user/:id",
  verifyUser,
  roleBasedAccess("admin"),
  updateUserRole,
);
router.delete(
  "/admin/user/:id",
  verifyUser,
  roleBasedAccess("admin"),
  deleteUser,
);
export default router;
