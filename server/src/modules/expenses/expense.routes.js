import { Router } from "express";

import { validate } from "../../middleware/joiValidate.middleware.js";
import {
  aggregateExpenses,
  createExpenseController,
  getExpensesController,
  getThisMonthExpenses,
  getTopSpending,
} from "./expense.controller.js";
import { createExpenseSchema } from "./expense.validation.js";
import authenticateToken from "../../middleware/jwtauth.middleware.js";
const router = Router();

// Route for creating a new user
router.post(
  "/",
  validate(createExpenseSchema),
  authenticateToken,
  createExpenseController
);
router.get("/", authenticateToken, getExpensesController);
router.get("/this-month", authenticateToken, getThisMonthExpenses);
router.get("/aggregate", authenticateToken, aggregateExpenses);
router.get("/top-spending", authenticateToken, getTopSpending);

export default router;
