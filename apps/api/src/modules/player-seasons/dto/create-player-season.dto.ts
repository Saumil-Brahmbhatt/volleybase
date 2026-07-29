import { PlayerStatus } from "@prisma/client";

export interface CreatePlayerSeasonDto {
  playerId: string;
  teamId: string;
  seasonId: string;

  jerseyNumber: number;

  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isForeignPlayer?: boolean;

  joinedAt?: Date;
  leftAt?: Date;

  status?: PlayerStatus;
}