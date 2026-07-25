import { Request, Response, NextFunction } from "express";
import { getAllPlayers } from "./service";

export const getPlayers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await getAllPlayers();

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    next(error);
  }
};