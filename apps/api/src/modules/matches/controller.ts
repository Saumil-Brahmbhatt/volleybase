import { Request, Response } from "express";

import * as matchService from "./service";

import {
  createMatchSchema,
  updateMatchSchema,
} from "./validation";

export async function getMatches(
  _req: Request,
  res: Response
) {
  const matches = await matchService.getMatches();

  res.json(matches);
}

export async function getMatch(
  req: Request,
  res: Response
) {
  const match = await matchService.getMatch(
    req.params.matchId
  );

  res.json(match);
}

export async function createMatch(
  req: Request,
  res: Response
) {
  const dto = createMatchSchema.parse(req.body);

  const match =
    await matchService.createMatch(dto);

  res.status(201).json(match);
}

export async function updateMatch(
  req: Request,
  res: Response
) {
  const dto = updateMatchSchema.parse(req.body);

  const match =
    await matchService.updateMatch(
      req.params.matchId,
      dto
    );

  res.json(match);
}

export async function deleteMatch(
  req: Request,
  res: Response
) {
  await matchService.deleteMatch(
    req.params.matchId
  );

  res.status(204).send();
}