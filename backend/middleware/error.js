import HandleError from "../utils/handleError.js";

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //! If the error is an instance of HandleError, we will send the custom error message and status code

  //! CastError is an error that occurs when we try to cast a value to a type that is not valid, for example, if we try to cast a string to an ObjectId in MongoDB, then we will get a CastError. So we will check if the error is an instance of CastError and if it is, then we will send a custom error message and status code
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new HandleError(message, 400);
  }
  //! Duplicate key error
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} already registered , login to continue.`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
