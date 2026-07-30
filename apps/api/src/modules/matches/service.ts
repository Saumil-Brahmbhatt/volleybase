import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";

import {
  NotFoundError,
  ConflictError,
} from "../../errors";

import {
  CreateMatchDto,
  UpdateMatchDto,
} from "./dto";

import {
  toMatchSummaryDto,
  toMatchDetailsDto,
} from "./mapper";

export async function getMatches() {
  const matches = await prisma.match.findMany({
    orderBy: {
      scheduledAt: "asc",
    },
  });

  return matches.map(toMatchSummaryDto);
}

export async function getMatch(
  matchId: string
) {
  const match = await prisma.match.findUnique({
    where: {
      matchId,
    },
  });

  if (!match) {
    throw new NotFoundError("Match");
  }

  return toMatchDetailsDto(match);
}

export async function createMatch(
  dto: CreateMatchDto
) {
  if (dto.homeTeamId === dto.awayTeamId) {
    throw new ConflictError(
      "Home team and away team cannot be the same."
    );
  }

  const season =
    await prisma.season.findUnique({
      where: {
        seasonId: dto.seasonId,
      },
    });

  if (!season) {
    throw new NotFoundError("Season");
  }

  if (dto.venueId) {
    const venue =
      await prisma.venue.findUnique({
        where: {
          venueId: dto.venueId,
        },
      });

    if (!venue) {
      throw new NotFoundError("Venue");
    }
  }

  const homeTeam =
    await prisma.team.findUnique({
      where: {
        teamId: dto.homeTeamId,
      },
    });

  if (!homeTeam) {
    throw new NotFoundError("Home Team");
  }

  const awayTeam =
    await prisma.team.findUnique({
      where: {
        teamId: dto.awayTeamId,
      },
    });

  if (!awayTeam) {
    throw new NotFoundError("Away Team");
  }

  const duplicate =
    await prisma.match.findFirst({
      where: {
        seasonId: dto.seasonId,
        homeTeamId: dto.homeTeamId,
        awayTeamId: dto.awayTeamId,
        scheduledAt: dto.scheduledAt,
      },
    });

  if (duplicate) {
    throw new ConflictError(
      "Match already exists."
    );
  }

  const match =
    await prisma.match.create({
      data: {
        matchId:
          await IdService.generate("match"),

        seasonId: dto.seasonId,

        venueId:
          dto.venueId ?? null,

        homeTeamId: dto.homeTeamId,
        awayTeamId: dto.awayTeamId,

        matchNumber:
          dto.matchNumber,

        round: dto.round,

        scheduledAt:
          dto.scheduledAt,

        startedAt:
          dto.startedAt ?? null,

        endedAt:
          dto.endedAt ?? null,

        bestOfSets:
          dto.bestOfSets,

        winningSets:
          dto.winningSets,

        currentSet:
          dto.currentSet,

        homeSetsWon:
          dto.homeSetsWon ?? 0,

        awaySetsWon:
          dto.awaySetsWon ?? 0,

        status: dto.status,
      },
    });

  return toMatchDetailsDto(match);
}

export async function updateMatch(
  matchId: string,
  dto: UpdateMatchDto
) {
  const existing = await prisma.match.findUnique({
    where: {
      matchId,
    },
  });

  if (!existing) {
    throw new NotFoundError("Match");
  }

  if (
    dto.homeTeamId &&
    dto.awayTeamId &&
    dto.homeTeamId === dto.awayTeamId
  ) {
    throw new ConflictError(
      "Home team and away team cannot be the same."
    );
  }

  if (dto.seasonId) {
    const season = await prisma.season.findUnique({
      where: {
        seasonId: dto.seasonId,
      },
    });

    if (!season) {
      throw new NotFoundError("Season");
    }
  }

  if (dto.venueId) {
    const venue = await prisma.venue.findUnique({
      where: {
        venueId: dto.venueId,
      },
    });

    if (!venue) {
      throw new NotFoundError("Venue");
    }
  }

  if (dto.homeTeamId) {
    const homeTeam = await prisma.team.findUnique({
      where: {
        teamId: dto.homeTeamId,
      },
    });

    if (!homeTeam) {
      throw new NotFoundError("Home Team");
    }
  }

  if (dto.awayTeamId) {
    const awayTeam = await prisma.team.findUnique({
      where: {
        teamId: dto.awayTeamId,
      },
    });

    if (!awayTeam) {
      throw new NotFoundError("Away Team");
    }
  }

  const updated = await prisma.match.update({
    where: {
      matchId,
    },
    data: {
      ...dto,
    },
  });

  return toMatchDetailsDto(updated);
}

export async function deleteMatch(
  matchId: string
) {
  const existing = await prisma.match.findUnique({
    where: {
      matchId,
    },
  });

  if (!existing) {
    throw new NotFoundError("Match");
  }

  await prisma.match.delete({
    where: {
      matchId,
    },
  });
}