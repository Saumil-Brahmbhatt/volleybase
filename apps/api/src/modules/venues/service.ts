import prisma from "../../lib/prisma";
import { generateVenueId } from "../../utils/id-generator";
import {
  generateSlug,
  appendSlugSuffix,
} from "../../utils/slug";

import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import {
  VenueDetailsDto,
  VenueSummaryDto,
} from "./dto/venue.dto";

import {
  toVenueDetailsDto,
  toVenueSummaryDto,
} from "./mapper";

export async function getVenues(): Promise<VenueSummaryDto[]> {
  const venues = await prisma.venue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return venues.map(toVenueSummaryDto);
}

export async function getVenue(
  venueId: string
): Promise<VenueDetailsDto> {
  const venue = await prisma.venue.findUnique({
    where: {
      venueId,
    },
  });

  if (!venue) {
    throw new Error("Venue not found.");
  }

  return toVenueDetailsDto(venue);
}

export async function createVenue(
  data: CreateVenueDto
): Promise<VenueDetailsDto> {
  const baseSlug = generateSlug(data.name);
  let slug = baseSlug;
  let counter = 2;

  while (
    await prisma.venue.findUnique({
      where: { slug },
    })
  ) {
    slug = appendSlugSuffix(baseSlug, counter++);
  }

  const venue = await prisma.venue.create({
    data: {
      venueId: await generateVenueId(),
      slug,
      ...data,
    },
  });

  return toVenueDetailsDto(venue);
}

export async function updateVenue(
  venueId: string,
  data: UpdateVenueDto
): Promise<VenueDetailsDto> {
  const existing = await prisma.venue.findUnique({
    where: {
      venueId,
    },
  });

  if (!existing) {
    throw new Error("Venue not found.");
  }

  const updateData: any = {
    ...data,
  };

  if (data.name) {
    const baseSlug = generateSlug(data.name);
    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const duplicate = await prisma.venue.findUnique({
        where: { slug },
      });

      if (!duplicate || duplicate.venueId === venueId) {
        break;
      }

      slug = appendSlugSuffix(baseSlug, counter++);
    }

    updateData.slug = slug;
  }

  const updated = await prisma.venue.update({
    where: {
      venueId,
    },
    data: updateData,
  });

  return toVenueDetailsDto(updated);
}

export async function deleteVenue(
  venueId: string
): Promise<void> {
  const existing = await prisma.venue.findUnique({
    where: {
      venueId,
    },
  });

  if (!existing) {
    throw new Error("Venue not found.");
  }

  await prisma.venue.delete({
    where: {
      venueId,
    },
  });
}