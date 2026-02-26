import express from "express";
import {
  changePassword,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  requestResetPassword,
  resetPassword,
  updateUserDetails,
} from "../controller/userController.js";
import { verifyUser } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/password/forgot", requestResetPassword);
router.post("/reset/:token", resetPassword);
router.post("/change-password", verifyUser, changePassword);
router.get("/profile", verifyUser, getUserDetails);
router.post("/profile/update", verifyUser, updateUserDetails);

export default router;
