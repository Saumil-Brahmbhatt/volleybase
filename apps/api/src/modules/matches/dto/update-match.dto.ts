import { MatchStatus } from "@prisma/client";

export interface UpdateMatchDto {
  seasonId?: string;
  venueId?: string | null;

  homeTeamId?: string;
  awayTeamId?: string;

  matchNumber?: number;

  round?: string;

  scheduledAt?: Date;

  startedAt?: Date | null;
  endedAt?: Date | null;

  bestOfSets?: number;
  winningSets?: number;

  currentSet?: number;

  homeSetsWon?: number;
  awaySetsWon?: number;

  status?: MatchStatus;
}