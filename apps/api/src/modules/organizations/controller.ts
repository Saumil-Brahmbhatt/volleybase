import { Request, Response, NextFunction } from "express";

import {
  getOrganization,
  getOrganizations,
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

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found.",
      });
    }

    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    next(error);
  }
}