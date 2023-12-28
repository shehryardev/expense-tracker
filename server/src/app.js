import express from "express";
import setupRoutes from "./routes/index.js";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(express.json());
// Use Cors middleware
app.use(cors());
// Use Morgan middleware
app.use(morgan("dev"));

// Setup all routes
setupRoutes(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
