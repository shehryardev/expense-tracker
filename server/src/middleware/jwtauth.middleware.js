import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseUtil.js";

const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return sendResponse(res, 401, null, "Invalid Token"); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return sendResponse(res, 403, null, "Invalid Token"); // Token is no longer valid

    req.user = user;
    next();
  });
};

export default authenticateToken;
