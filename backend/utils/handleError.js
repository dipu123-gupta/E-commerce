class HandleError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor
    this.statusCode = statusCode; // Set the status code
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

export default HandleError;
