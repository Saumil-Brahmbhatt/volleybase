import { Request, Response, NextFunction } from "express";

import {
  getCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "./service";

export async function getAllCompetitions(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const competitions = await getCompetitions();

    res.json({
      success: true,
      data: competitions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCompetitionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const competition = await getCompetition(
      req.params.competitionId
    );

    res.json({
      success: true,
      data: competition,
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
    const competition = await createCompetition(req.body);

    res.status(201).json({
      success: true,
      data: competition,
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
    const competition = await updateCompetition(
      req.params.competitionId,
      req.body
    );

    res.json({
      success: true,
      data: competition,
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
    await deleteCompetition(
      req.params.competitionId
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}