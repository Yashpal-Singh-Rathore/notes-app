import AppError from "../utils/AppError.js";

const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      const message = err.errors.map((e) => e.message).join(", ");
      next(new AppError(message, 400));
    }
  };
};

export default validateParams;
