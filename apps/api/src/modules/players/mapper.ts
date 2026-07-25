import { Player } from "@prisma/client";
import { PlayerSummaryDto, PlayerDetailsDto } from "./dto";

export const toPlayerSummaryDto = (
  player: Player
): PlayerSummaryDto => ({
  playerId: player.playerId,
  slug: player.slug,

  fullName: player.fullName,
  shortName: player.shortName,

  nationality: player.nationality,

  position: player.position,

  status: player.status,
});

export const toPlayerDetailsDto = (
  player: Player
): PlayerDetailsDto => ({
  playerId: player.playerId,
  slug: player.slug,

  fullName: player.fullName,
  shortName: player.shortName,

  firstName: player.firstName,
  lastName: player.lastName,
  nativeName: player.nativeName,

  gender: player.gender,

  nationality: player.nationality,

  birthDate: player.birthDate.toISOString(),
  birthPlace: player.birthPlace,

  heightCm: player.heightCm,
  weightKg: player.weightKg,

  spikeReachCm: player.spikeReachCm,
  blockReachCm: player.blockReachCm,

  dominantHand: player.dominantHand,

  position: player.position,

  status: player.status,
});