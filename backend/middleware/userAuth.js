import { handleAsyncError } from "./handleAsynError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";

export const verifyUser = handleAsyncError(async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  console.log("Token:", req.cookies.token);

  const token = req.cookies.token;

  if (!token) {
    return next(new Error("Not authorized to access this route"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role - ${req.user.role} is not allowed to access this route`,
          403,
        ),
      );
    }
    next();
  };
};
