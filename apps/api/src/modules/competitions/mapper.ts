import { Competition } from "@prisma/client";

import {
  CompetitionSummaryDto,
  CompetitionDetailsDto,
} from "./dto";

export function toCompetitionSummaryDto(
  competition: Competition
): CompetitionSummaryDto {
  return {
    competitionId: competition.competitionId,

    slug: competition.slug,

    name: competition.name,

    shortName: competition.shortName,

    organizationId: competition.organizationId,

    status: competition.status,
  };
}

export function toCompetitionDetailsDto(
  competition: Competition
): CompetitionDetailsDto {
  return {
    competitionId: competition.competitionId,

    slug: competition.slug,

    name: competition.name,

    shortName: competition.shortName,

    organizationId: competition.organizationId,

    status: competition.status,
  };
}