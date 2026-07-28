import { Season } from "@prisma/client";

import {
  SeasonSummaryDto,
  SeasonDetailsDto,
} from "./dto";

export function toSeasonSummaryDto(
  season: Season
): SeasonSummaryDto {
  return {
    seasonId: season.seasonId,

    competitionId: season.competitionId,

    slug: season.slug,

    name: season.name,

    shortName: season.shortName,

    seasonYear: season.seasonYear,

    startDate: season.startDate,

    endDate: season.endDate,

    status: season.status,
  };
}

export function toSeasonDetailsDto(
  season: Season
): SeasonDetailsDto {
  return {
    seasonId: season.seasonId,

    competitionId: season.competitionId,

    slug: season.slug,

    name: season.name,

    shortName: season.shortName,

    seasonYear: season.seasonYear,

    startDate: season.startDate,

    endDate: season.endDate,

    status: season.status,

    createdAt: season.createdAt,

    updatedAt: season.updatedAt,
  };
}