import { MatchStatus } from "@prisma/client";

export interface CreateMatchDto {
  seasonId: string;
  venueId?: string;

  homeTeamId: string;
  awayTeamId: string;

  matchNumber?: number;

  round: string;

  scheduledAt: Date;

  startedAt?: Date;
  endedAt?: Date;

  bestOfSets: number;
  winningSets: number;

  currentSet: number;

  homeSetsWon?: number;
  awaySetsWon?: number;

  status: MatchStatus;
}