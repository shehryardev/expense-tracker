import { Router } from "express";
import { getCategoriesController } from "./category.controller.js";

const router = Router();

router.get("/", getCategoriesController);

export default router;
