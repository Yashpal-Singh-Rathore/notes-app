export const errorHandler = (err, req, res, next) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong on the server";

  // Log unexpected errors
  if (!err.isOperational) {
    console.error("UNEXPECTED ERROR:", err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
