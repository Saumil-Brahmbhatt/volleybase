import express from "express";
import cors from "cors";
import { API_PREFIX } from "./constants/api";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(`${API_PREFIX}/health`, healthRoutes);

app.get("/", (_req, res) => {
  res.json({
    name: "VolleyBase API",
    version: "1.0.0",
    status: "running",
    message: "Welcome to The Home of Volleyball 🏐"
  });
});

export default app;