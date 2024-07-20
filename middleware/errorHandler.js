const CustomError = require("../utils/customError");
const { errorResponse } = require("../utils/responseHelper");

// Middleware to handle errors across the application.
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    // Handle custom application-specific errors
    return errorResponse(res, err.message, err, err.statusCode);
  }

  // Log the full stack trace of the error for debugging
  console.error(err.stack);

  // Handle all other types of errors
  // Provide a generic message and status code for unexpected errors
  return errorResponse(res, "Something went wrong", err, 500);
};

module.exports = errorHandler;
