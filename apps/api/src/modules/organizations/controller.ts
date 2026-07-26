import { Request, Response, NextFunction } from "express";

import {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
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

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organization = await updateOrganization(
      req.params.organizationId,
      req.body
    );

    res.json({
      success: true,
      data: organization,
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
    await deleteOrganization(
      req.params.organizationId
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}