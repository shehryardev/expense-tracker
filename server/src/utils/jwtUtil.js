import jwt from "jsonwebtoken";

export const generateJWT = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
