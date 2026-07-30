import { Request, Response } from "express";

import * as venueService from "./service";

import {
  createVenueSchema,
  updateVenueSchema,
} from "./validation";

export async function getVenues(
  _req: Request,
  res: Response
) {
  const venues = await venueService.getVenues();

  res.json(venues);
}

export async function getVenue(
  req: Request,
  res: Response
) {
  const venue = await venueService.getVenue(
    req.params.venueId
  );

  res.json(venue);
}

export async function createVenue(
  req: Request,
  res: Response
) {
  const data = createVenueSchema.parse(req.body);

  const venue = await venueService.createVenue(data);

  res.status(201).json(venue);
}

export async function updateVenue(
  req: Request,
  res: Response
) {
  const data = updateVenueSchema.parse(req.body);

  const venue = await venueService.updateVenue(
    req.params.venueId,
    data
  );

  res.json(venue);
}

export async function deleteVenue(
  req: Request,
  res: Response
) {
  await venueService.deleteVenue(
    req.params.venueId
  );

  res.status(204).send();
}