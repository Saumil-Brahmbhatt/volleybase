import { Request, Response } from "express";

import * as playerSeasonService from "./service";

import {
  createPlayerSeasonSchema,
  updatePlayerSeasonSchema,
} from "./validation";

export async function getPlayerSeasons(
  req: Request,
  res: Response
) {
  const playerSeasons =
    await playerSeasonService.getPlayerSeasons();

  res.json(playerSeasons);
}

export async function getPlayerSeason(
  req: Request,
  res: Response
) {
  const playerSeason =
    await playerSeasonService.getPlayerSeason(
      req.params.playerSeasonId
    );

  res.json(playerSeason);
}

export async function createPlayerSeason(
  req: Request,
  res: Response
) {
  const data = createPlayerSeasonSchema.parse(req.body);

  const playerSeason =
    await playerSeasonService.createPlayerSeason(data);

  res.status(201).json(playerSeason);
}

export async function updatePlayerSeason(
  req: Request,
  res: Response
) {
  const data = updatePlayerSeasonSchema.parse(req.body);

  const playerSeason =
    await playerSeasonService.updatePlayerSeason(
      req.params.playerSeasonId,
      data
    );

  res.json(playerSeason);
}

export async function deletePlayerSeason(
  req: Request,
  res: Response
) {
  await playerSeasonService.deletePlayerSeason(
    req.params.playerSeasonId
  );

  res.status(204).send();
}