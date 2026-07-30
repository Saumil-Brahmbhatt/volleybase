import { MatchStatus } from "@prisma/client";

export interface MatchSummaryDto {
  matchId: string;
  seasonId: string;
  venueId: string | null;

  homeTeamId: string;
  awayTeamId: string;

  matchNumber: number | null;
  round: string;

  scheduledAt: Date;

  status: MatchStatus;

  homeSetsWon: number;
  awaySetsWon: number;
}

export interface MatchDetailsDto extends MatchSummaryDto {
  startedAt: Date | null;
  endedAt: Date | null;

  bestOfSets: number;
  winningSets: number;
  currentSet: number;

  createdAt: Date;
  updatedAt: Date;
}