import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import healthRoutes from "./modules/health/routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";
import { playerRoutes } from "./modules/players";
import { organizationRoutes } from "./modules/organizations";
import competitionRoutes from "./modules/competitions";
import seasonRoutes from "./modules/seasons";
import teamRoutes from "./modules/teams"

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/competitions", competitionRoutes);
app.use("/api/v1/seasons", seasonRoutes);
app.use("/api/v1/teams", teamRoutes)

app.get("/", (_req, res) => {
  res.json({
    name: "VolleyBase API",
    version: "1.0.0",
    status: "running",
    message: "Welcome to The Home of Volleyball 🏐"
  });
});

app.use(notFound);
app.use(errorMiddleware);

export default app;