import { Request, Response, NextFunction } from "express";

import {
  getOrganizations,
  getOrganization,
  createOrganization,
} from "./service";

export async function getAllOrganizations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizations = await getOrganizations();

    res.json({
      success: true,
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrganizationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organization = await getOrganization(
      req.params.organizationId
    );

    res.json({
      success: true,
      data: organization,
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
    const organization = await createOrganization(req.body);

    res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    next(error);
  }
}