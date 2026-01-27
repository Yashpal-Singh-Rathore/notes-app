import AppError from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const message = err.issues.map((issue) => issue.message).join(", ");
      next(new AppError(message, 400));
    }
  };
};

export default validate;
