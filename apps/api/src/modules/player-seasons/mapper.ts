import { PlayerSeason } from "@prisma/client";
import {
  PlayerSeasonDetailsDto,
  PlayerSeasonSummaryDto,
} from "./dto/player-season.dto";

export function toPlayerSeasonSummaryDto(
  playerSeason: PlayerSeason
): PlayerSeasonSummaryDto {
  return {
    playerSeasonId: playerSeason.playerSeasonId,
    playerId: playerSeason.playerId,
    teamId: playerSeason.teamId,
    seasonId: playerSeason.seasonId,

    jerseyNumber: playerSeason.jerseyNumber,

    isCaptain: playerSeason.isCaptain,
    isViceCaptain: playerSeason.isViceCaptain,
    isForeignPlayer: playerSeason.isForeignPlayer,

    status: playerSeason.status,
  };
}

export function toPlayerSeasonDetailsDto(
  playerSeason: PlayerSeason
): PlayerSeasonDetailsDto {
  return {
    ...toPlayerSeasonSummaryDto(playerSeason),

    joinedAt: playerSeason.joinedAt,
    leftAt: playerSeason.leftAt,

    createdAt: playerSeason.createdAt,
    updatedAt: playerSeason.updatedAt,
  };
}