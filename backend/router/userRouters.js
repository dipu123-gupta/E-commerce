import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  requestResetPassword,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/password/forgot", requestResetPassword);

export default router;
