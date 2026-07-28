import { SeasonStatus } from "@prisma/client";

import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";

import { generateSlug } from "../../utils/slug";

import {
  ConflictError,
  NotFoundError,
} from "../../errors";

import {
  CreateSeasonDto,
  UpdateSeasonDto,
} from "./dto";

import {
  toSeasonSummaryDto,
  toSeasonDetailsDto,
} from "./mapper";

export async function getSeasons() {
  const seasons = await prisma.season.findMany({
    orderBy: [
      {
        seasonYear: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  return seasons.map(toSeasonSummaryDto);
}

export async function getSeason(
  seasonId: string
) {
  const season = await prisma.season.findUnique({
    where: {
      seasonId,
    },
  });

  if (!season) {
    throw new NotFoundError("Season");
  }

  return toSeasonDetailsDto(season);
}

export async function createSeason(
  dto: CreateSeasonDto
) {
  // Check competition exists
  const competition = await prisma.competition.findUnique({
    where: {
      competitionId: dto.competitionId,
    },
  });

  if (!competition) {
    throw new NotFoundError("Competition");
  }

  // Prevent duplicate season year in the same competition
  const existing = await prisma.season.findFirst({
    where: {
      competitionId: dto.competitionId,
      seasonYear: dto.seasonYear,
    },
  });

  if (existing) {
    throw new ConflictError(
      "Season already exists."
    );
  }

  const season = await prisma.season.create({
    data: {
      seasonId: await IdService.generate("season"),

      competitionId: dto.competitionId,

      slug: generateSlug(
        `${dto.name} ${dto.seasonYear}`
      ),

      name: dto.name,

      shortName: dto.shortName,

      seasonYear: dto.seasonYear,

      startDate: dto.startDate,

      endDate: dto.endDate,

      status:
        dto.status ??
        SeasonStatus.UPCOMING,
    },
  });

  return toSeasonDetailsDto(season);
}

export async function updateSeason(
  seasonId: string,
  dto: UpdateSeasonDto
) {
  const season = await prisma.season.findUnique({
    where: {
      seasonId,
    },
  });

  if (!season) {
    throw new NotFoundError("Season");
  }

  const data: any = {
    ...dto,
  };

  if (dto.name || dto.seasonYear) {
    data.slug = generateSlug(
      `${dto.name ?? season.name} ${dto.seasonYear ?? season.seasonYear}`
    );
  }

  const updated = await prisma.season.update({
    where: {
      seasonId,
    },
    data,
  });

  return toSeasonDetailsDto(updated);
}

export async function deleteSeason(
  seasonId: string
) {
  const season = await prisma.season.findUnique({
    where: {
      seasonId,
    },
  });

  if (!season) {
    throw new NotFoundError("Season");
  }

  await prisma.season.delete({
    where: {
      seasonId,
    },
  });
}