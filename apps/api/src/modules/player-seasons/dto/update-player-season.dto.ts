import { PlayerStatus } from "@prisma/client";

export interface UpdatePlayerSeasonDto {
  teamId?: string;

  jerseyNumber?: number;

  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isForeignPlayer?: boolean;

  joinedAt?: Date;
  leftAt?: Date;

  status?: PlayerStatus;
}