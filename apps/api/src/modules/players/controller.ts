import { Request, Response, NextFunction } from "express";

import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "./service";

export async function getAllPlayers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players = await getPlayers();

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPlayerById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const player = await getPlayer(
      req.params.playerId
    );

    res.json({
      success: true,
      data: player,
    });
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const player = await createPlayer(req.body);

    res.status(201).json({
      success: true,
      data: player,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const player = await updatePlayer(
      req.params.playerId,
      req.body
    );

    res.json({
      success: true,
      data: player,
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await deletePlayer(req.params.playerId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}