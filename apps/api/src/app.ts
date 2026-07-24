import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "VolleyBase API",
    version: "1.0.0",
    status: "running",
    message: "Welcome to The Home of Volleyball 🏐"
  });
});

export default app;