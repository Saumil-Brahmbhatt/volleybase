import { Match } from "@prisma/client";

import {
  MatchSummaryDto,
  MatchDetailsDto,
} from "./dto/match.dto";

export function toMatchSummaryDto(
  match: Match
): MatchSummaryDto {
  return {
    matchId: match.matchId,

    seasonId: match.seasonId,
    venueId: match.venueId,

    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,

    matchNumber: match.matchNumber,

    round: match.round,

    scheduledAt: match.scheduledAt,

    status: match.status,

    homeSetsWon: match.homeSetsWon,
    awaySetsWon: match.awaySetsWon,
  };
}

export function toMatchDetailsDto(
  match: Match
): MatchDetailsDto {
  return {
    ...toMatchSummaryDto(match),

    startedAt: match.startedAt,
    endedAt: match.endedAt,

    bestOfSets: match.bestOfSets,
    winningSets: match.winningSets,

    currentSet: match.currentSet,

    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
  };
}