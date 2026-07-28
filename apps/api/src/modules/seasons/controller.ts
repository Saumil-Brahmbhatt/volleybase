import { Request, Response, NextFunction } from "express";

import {
  getSeasons,
  getSeason,
  createSeason,
  updateSeason,
  deleteSeason,
} from "./service";

export async function getAllSeasons(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const seasons = await getSeasons();

    res.json({
      success: true,
      data: seasons,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSeasonById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const season = await getSeason(
      req.params.seasonId
    );

    res.json({
      success: true,
      data: season,
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
    const season = await createSeason(req.body);

    res.status(201).json({
      success: true,
      data: season,
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
    const season = await updateSeason(
      req.params.seasonId,
      req.body
    );

    res.json({
      success: true,
      data: season,
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
    await deleteSeason(req.params.seasonId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}