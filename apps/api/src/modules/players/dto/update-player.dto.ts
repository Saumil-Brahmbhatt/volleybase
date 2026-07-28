import {
  Gender,
  PlayerStatus,
  Position,
  DominantHand,
} from "@prisma/client";

export interface UpdatePlayerDto {
  fullName?: string;

  shortName?: string;

  firstName?: string;

  lastName?: string;

  nativeName?: string;

  gender?: Gender;

  nationality?: string;

  birthDate?: Date;

  birthPlace?: string;

  heightCm?: number;

  weightKg?: number;

  spikeReachCm?: number;

  blockReachCm?: number;

  dominantHand?: DominantHand;

  position?: Position;

  status?: PlayerStatus;
}