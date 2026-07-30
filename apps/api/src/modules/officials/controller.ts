import { Request, Response } from "express";

import * as officialService from "./service";

import {
  createOfficialSchema,
  updateOfficialSchema,
} from "./validation";

export async function getOfficials(
  _req: Request,
  res: Response
) {
  const officials = await officialService.getOfficials();

  res.json(officials);
}

export async function getOfficial(
  req: Request,
  res: Response
) {
  const official = await officialService.getOfficial(
    req.params.officialId
  );

  res.json(official);
}

export async function createOfficial(
  req: Request,
  res: Response
) {
  const data = createOfficialSchema.parse(req.body);

  const official =
    await officialService.createOfficial(data);

  res.status(201).json(official);
}

export async function updateOfficial(
  req: Request,
  res: Response
) {
  const data = updateOfficialSchema.parse(req.body);

  const official =
    await officialService.updateOfficial(
      req.params.officialId,
      data
    );

  res.json(official);
}

export async function deleteOfficial(
  req: Request,
  res: Response
) {
  await officialService.deleteOfficial(
    req.params.officialId
  );

  res.status(204).send();
}