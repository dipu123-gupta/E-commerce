import { handleAsyncError } from "../middleware/handleAsynError.js";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import { sendTolken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

//@ Register user controller
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }
  console.log(name, email, password);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });

  //! create token and send token to cookie
  sendTolken(user, 200, res);
});

//@ login user
export const loginUser = handleAsyncError(async (req, res, next) => {
  //! get email and password from req.body
  const { email, password } = req.body;
  //!  check if email and password is present or not
  if (!email || !password) {
    return next(new HandleError("Please fill all the fields", 400));
  }

  //!  check if user is present or not
  const user = await User.findOne({ email }).select("+password");
  //!   if not present return error
  if (!user) {
    return next(new HandleError("Invalid email or password", 400));
  }
  //! check password
  const isPassword = await user.comparePassword(password);
  //!   if not present return error
  if (!isPassword) {
    return next(new HandleError("Invalid email or password", 400));
  }

  //! create token and send token to cookie
  sendTolken(user, 200, res);
});

//@ logout user
export const logoutUser = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//@ Reset Password Controller
export const requestResetPassword = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not exist", 404));
  }

  let resetToken;
  try {
    resetToken = await user.generateResetPasswordToken();
    console.log(resetToken);
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(
      new HandleError("Could not save reset token,please try again", 500),
    );
  }

  const resetPasswordUrl = `http://localhost/api/v1/auth/reset/${resetToken}`;
  console.log(resetPasswordUrl);

  const message = `Use the following link to reset your password: \n\n
   ${resetPasswordUrl} \n\n This link will expire in 15 minutes.\n\n
    If you did not request a password reset, please ignore this message.`;
  try {
    // @ send email to user with reset password link
    sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email is sent to user successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new HandleError(error.message, 500));
  }

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
