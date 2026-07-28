import { TeamStatus } from "@prisma/client";

import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";

import { generateSlug } from "../../utils/slug";

import {
  ConflictError,
  NotFoundError,
} from "../../errors";

import {
  CreateTeamDto,
  UpdateTeamDto,
} from "./dto";

import {
  toTeamSummaryDto,
  toTeamDetailsDto,
} from "./mapper";

export async function getTeams() {
  const teams = await prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return teams.map(toTeamSummaryDto);
}

export async function getTeam(
  teamId: string
) {
  const team = await prisma.team.findUnique({
    where: {
      teamId,
    },
  });

  if (!team) {
    throw new NotFoundError("Team");
  }

  return toTeamDetailsDto(team);
}

export async function createTeam(
  dto: CreateTeamDto
) {
  // Check organization exists
  const organization = await prisma.organization.findUnique({
    where: {
      organizationId: dto.organizationId,
    },
  });

  if (!organization) {
    throw new NotFoundError("Organization");
  }

  // Check venue exists (if provided)
  if (dto.homeVenueId) {
    const venue = await prisma.venue.findUnique({
      where: {
        venueId: dto.homeVenueId,
      },
    });

    if (!venue) {
      throw new NotFoundError("Venue");
    }
  }

  // Check duplicate team
  const existing = await prisma.team.findFirst({
    where: {
      organizationId: dto.organizationId,
      OR: [
        {
          name: dto.name,
        },
        {
          abbreviation: dto.abbreviation.toUpperCase(),
        },
      ],
    },
  });

  if (existing) {
    throw new ConflictError(
      "Team already exists."
    );
  }

  const team = await prisma.team.create({
    data: {
      teamId: await IdService.generate("team"),

      slug: generateSlug(dto.name),

      organizationId: dto.organizationId,

      homeVenueId: dto.homeVenueId,

      name: dto.name,

      shortName: dto.shortName,

      abbreviation: dto.abbreviation.toUpperCase(),

      city: dto.city,

      foundedYear: dto.foundedYear,

      status:
        dto.status ??
        TeamStatus.ACTIVE,
    },
  });

  return toTeamDetailsDto(team);
}

export async function updateTeam(
  teamId: string,
  dto: UpdateTeamDto
) {
  const team = await prisma.team.findUnique({
    where: {
      teamId,
    },
  });

  if (!team) {
    throw new NotFoundError("Team");
  }

  if (dto.homeVenueId) {
    const venue = await prisma.venue.findUnique({
      where: {
        venueId: dto.homeVenueId,
      },
    });

    if (!venue) {
      throw new NotFoundError("Venue");
    }
  }

  const data: any = {
    ...dto,
  };

  if (dto.name) {
    data.slug = generateSlug(dto.name);
  }

  if (dto.abbreviation) {
    data.abbreviation = dto.abbreviation.toUpperCase();
  }

  const updated = await prisma.team.update({
    where: {
      teamId,
    },
    data,
  });

  return toTeamDetailsDto(updated);
}

export async function deleteTeam(
  teamId: string
) {
  const team = await prisma.team.findUnique({
    where: {
      teamId,
    },
  });

  if (!team) {
    throw new NotFoundError("Team");
  }

  await prisma.team.delete({
    where: {
      teamId,
    },
  });
}