import { sendResponse } from "../../utils/responseUtil.js";
import { getUserById } from "./user.service.js";
// Controller function for gettig user details
export const meController = async (req, res) => {
  try {
    const me = await getUserById(req?.user?.userId);
    return sendResponse(res, 200, me);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
