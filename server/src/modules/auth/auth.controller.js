import { sendResponse } from "../../utils/responseUtil.js";
import { findAndCreateUser } from "./auth.service.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controller function for logging in  a user
export const loginController = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const user = await findAndCreateUser(payload);

    const access_token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return sendResponse(res, 200, { access_token });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
