import { Request, Response, NextFunction } from "express";

import {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from "./service";

export async function getAllTeams(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const teams = await getTeams();

    res.json({
      success: true,
      data: teams,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTeamById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const team = await getTeam(req.params.teamId);

    res.json({
      success: true,
      data: team,
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
    const team = await createTeam(req.body);

    res.status(201).json({
      success: true,
      data: team,
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
    const team = await updateTeam(
      req.params.teamId,
      req.body
    );

    res.json({
      success: true,
      data: team,
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
    await deleteTeam(req.params.teamId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}