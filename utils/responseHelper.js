const successResponse = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

const errorResponse = (res, message, error = null, statusCode = 500) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
