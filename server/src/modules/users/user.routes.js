import { Router } from "express";
import { validate } from "../../middleware/joiValidate.middleware.js";
import { meController } from "./user.controller.js";
import authenticateToken from "../../middleware/jwtauth.middleware.js";

const router = Router();

// Route for creating a new user
router.get("/me", authenticateToken, meController);

export default router;
