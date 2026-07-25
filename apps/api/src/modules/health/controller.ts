import { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "VolleyBase API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
};