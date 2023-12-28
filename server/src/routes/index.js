import userRoutes from "../modules/users/user.routes.js";
import expenseRoutes from "../modules/expenses/expense.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";

// Import other route modules as needed

export default function (app) {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/expenses", expenseRoutes);
  app.use("/api/category", categoryRoutes);
  // Setup other route modules
}
