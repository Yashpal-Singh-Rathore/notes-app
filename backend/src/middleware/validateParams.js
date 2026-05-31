import AppError from "../utils/AppError.js";

const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      const issues = err.issues ?? err.errors ?? [];
      const message =
        issues.map((issue) => issue.message).join(", ") ||
        "Invalid request parameters";
      next(new AppError(message, 400));
    }
  };
};

export default validateParams;
