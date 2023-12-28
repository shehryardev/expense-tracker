import { Router } from "express";
import { loginController } from "./auth.controller.js";

const router = Router();

// Route for logging in a user
router.post("/login", loginController);

export default router;
