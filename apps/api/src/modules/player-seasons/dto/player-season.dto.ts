import { PlayerStatus } from "@prisma/client";

export interface PlayerSeasonSummaryDto {
  playerSeasonId: string;
  playerId: string;
  teamId: string;
  seasonId: string;

  jerseyNumber: number;

  isCaptain: boolean;
  isViceCaptain: boolean;
  isForeignPlayer: boolean;

  status: PlayerStatus;
}

export interface PlayerSeasonDetailsDto extends PlayerSeasonSummaryDto {
  joinedAt: Date | null;
  leftAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}