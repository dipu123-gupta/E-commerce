import { handleAsyncError } from "../middleware/handleAsynError.js";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

//@ ================= REGISTER USER =================
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HandleError("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample_id",
      url: "sample_url",
    },
  });

  sendToken(user, 201, res);
});

//@ ================= LOGIN USER =================
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new HandleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//@ ================= LOGOUT USER =================
export const logoutUser = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//@ ================= FORGOT PASSWORD =================
export const requestResetPassword = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User does not exist", 404));
  }

  const resetToken = user.generateResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:4000/api/v1/auth/reset/${resetToken}`;

  const message = `
    Use the following link to reset your password:

    ${resetPasswordUrl}

    This link will expire in 15 minutes.
  `;

  await sendEmail({
    email: user.email,
    subject: "Password Reset Request",
    message,
  });

  return res.status(200).json({
    success: true,
    message: "Reset password email sent successfully",
  });
});

//@ ================= RESET PASSWORD =================
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new HandleError("Token is invalid or expired", 400));
  }

  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }

  if (password.length < 8) {
    return next(
      new HandleError("Password should be at least 8 characters", 400),
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//@ ================= CHANGE PASSWORD =================
export const changePassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!req.user) {
    return next(new HandleError("User not authenticated", 401));
  }

  if (newPassword !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }

  if (newPassword.length < 8) {
    return next(
      new HandleError("Password should be at least 8 characters", 400),
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new HandleError("Old password is incorrect", 401));
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//@ ================= GET USER DETAILS =================
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

// @ ================= UPDATE USER DETAILS =================
export const updateUserDetails = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new HandleError("Please fill all the fields", 400));
  }
  const updatedUserDetails = {
    name,
    email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User details updated successfully",
    user,
  });
});
