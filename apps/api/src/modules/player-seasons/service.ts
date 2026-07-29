import prisma from "../../lib/prisma";
import { generatePlayerSeasonId } from "../../utils/id-generator";
import { CreatePlayerSeasonDto } from "./dto/create-player-season.dto";
import { UpdatePlayerSeasonDto } from "./dto/update-player-season.dto";
import {
    PlayerSeasonDetailsDto,
    PlayerSeasonSummaryDto,
} from "./dto/player-season.dto";
import {
  toPlayerSeasonDetailsDto,
  toPlayerSeasonSummaryDto,
} from "./mapper";

export async function getPlayerSeasons(): Promise<PlayerSeasonSummaryDto[]> {
  const playerSeasons = await prisma.playerSeason.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return playerSeasons.map(toPlayerSeasonSummaryDto);
}

export async function getPlayerSeason(
  playerSeasonId: string
): Promise<PlayerSeasonDetailsDto> {
  const playerSeason = await prisma.playerSeason.findUnique({
    where: {
      playerSeasonId,
    },
  });

  if (!playerSeason) {
    throw new Error("Player season not found.");
  }

  return toPlayerSeasonDetailsDto(playerSeason);
}

export async function createPlayerSeason(
  data: CreatePlayerSeasonDto
): Promise<PlayerSeasonDetailsDto> {
      const player = await prisma.player.findUnique({
    where: {
      playerId: data.playerId,
    },
  });

  if (!player) {
    throw new Error("Player not found.");
  }

    const team = await prisma.team.findUnique({
    where: {
      teamId: data.teamId,
    },
  });

  if (!team) {
    throw new Error("Team not found.");
  }

    const season = await prisma.season.findUnique({
    where: {
      seasonId: data.seasonId,
    },
  });

  if (!season) {
    throw new Error("Season not found.");
  }

    const existingAssignment =
    await prisma.playerSeason.findUnique({
      where: {
        playerId_seasonId: {
          playerId: data.playerId,
          seasonId: data.seasonId,
        },
      },
    });

  if (existingAssignment) {
    throw new Error(
      "Player is already assigned to this season."
    );
  }

    const jerseyTaken =
    await prisma.playerSeason.findUnique({
      where: {
        teamId_seasonId_jerseyNumber: {
          teamId: data.teamId,
          seasonId: data.seasonId,
          jerseyNumber: data.jerseyNumber,
        },
      },
    });

  if (jerseyTaken) {
    throw new Error(
      "Jersey number is already in use."
    );
  }

    const playerSeason =
    await prisma.playerSeason.create({
      data: {
        playerSeasonId: await generatePlayerSeasonId(),

        playerId: data.playerId,
        teamId: data.teamId,
        seasonId: data.seasonId,

        jerseyNumber: data.jerseyNumber,

        isCaptain: data.isCaptain ?? false,
        isViceCaptain: data.isViceCaptain ?? false,
        isForeignPlayer: data.isForeignPlayer ?? false,

        joinedAt: data.joinedAt,
        leftAt: data.leftAt,

        status: data.status,
      },
    });

  return toPlayerSeasonDetailsDto(playerSeason);
}

export async function updatePlayerSeason(
  playerSeasonId: string,
  data: UpdatePlayerSeasonDto
): Promise<PlayerSeasonDetailsDto> {
      const existing =
    await prisma.playerSeason.findUnique({
      where: {
        playerSeasonId,
      },
    });

  if (!existing) {
    throw new Error("Player season not found.");
  }

    if (data.teamId) {
    const team = await prisma.team.findUnique({
      where: {
        teamId: data.teamId,
      },
    });

    if (!team) {
      throw new Error("Team not found.");
    }
  }

    if (
    data.teamId ||
    data.jerseyNumber !== undefined
  ) {
    const teamId = data.teamId ?? existing.teamId;
    const jersey =
      data.jerseyNumber ?? existing.jerseyNumber;

    const duplicate =
      await prisma.playerSeason.findFirst({
        where: {
          teamId,
          seasonId: existing.seasonId,
          jerseyNumber: jersey,
          NOT: {
            playerSeasonId,
          },
        },
      });

    if (duplicate) {
      throw new Error(
        "Jersey number is already in use."
      );
    }
  }

    const updated =
    await prisma.playerSeason.update({
      where: {
        playerSeasonId,
      },
      data,
    });

  return toPlayerSeasonDetailsDto(updated);
}

export async function deletePlayerSeason(
  playerSeasonId: string
): Promise<void> {
  const existing =
    await prisma.playerSeason.findUnique({
      where: {
        playerSeasonId,
      },
    });

  if (!existing) {
    throw new Error("Player season not found.");
  }

  await prisma.playerSeason.delete({
    where: {
      playerSeasonId,
    },
  });
}