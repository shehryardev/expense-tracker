import { sendResponse } from "../utils/responseUtil.js";
// Middleware for validating request data with a Joi schema
export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.message, "Internal Server Error");
  }
  next();
};
