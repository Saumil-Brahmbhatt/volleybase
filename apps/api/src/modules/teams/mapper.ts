import { Team } from "@prisma/client";

import {
  TeamSummaryDto,
  TeamDetailsDto,
} from "./dto";

export function toTeamSummaryDto(
  team: Team
): TeamSummaryDto {
  return {
    teamId: team.teamId,

    slug: team.slug,

    organizationId: team.organizationId,

    homeVenueId: team.homeVenueId,

    name: team.name,

    shortName: team.shortName,

    abbreviation: team.abbreviation,

    city: team.city,

    foundedYear: team.foundedYear,

    status: team.status,
  };
}

export function toTeamDetailsDto(
  team: Team
): TeamDetailsDto {
  return {
    teamId: team.teamId,

    slug: team.slug,

    organizationId: team.organizationId,

    homeVenueId: team.homeVenueId,

    name: team.name,

    shortName: team.shortName,

    abbreviation: team.abbreviation,

    city: team.city,

    foundedYear: team.foundedYear,

    status: team.status,

    createdAt: team.createdAt,

    updatedAt: team.updatedAt,
  };
}