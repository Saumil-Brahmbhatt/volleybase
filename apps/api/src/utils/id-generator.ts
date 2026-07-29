import prisma from "../lib/prisma";
import { PrismaClient } from "@prisma/client";

export enum IdPrefix {
  PLAYER = "PLY",
  PLAYER_SEASON = "PSN",
  TEAM = "TEM",
  ORGANIZATION = "ORG",
  COMPETITION = "COM",
  SEASON = "SEA",
  VENUE = "VEN",
  MATCH = "MAT",
  OFFICIAL = "OFF",
}

const DEFAULT_LENGTH = 6;

export const padNumber = (
  value: number,
  length: number = DEFAULT_LENGTH
): string => value.toString().padStart(length, "0");

export const buildPublicId = (
  prefix: IdPrefix,
  sequence: number
): string => `${prefix}${padNumber(sequence)}`;

export const extractSequence = (
  publicId: string
): number => {
  const match = publicId.match(/\d+$/);
  return match ? Number(match[0]) : 0;
};

export const generateNextPublicId = (
  prefix: IdPrefix,
  lastPublicId?: string | null
): string => {
  if (!lastPublicId) {
    return buildPublicId(prefix, 1);
  }

  return buildPublicId(
    prefix,
    extractSequence(lastPublicId) + 1
  );
};

async function generateNextId<
  T extends keyof PrismaClient
>(
  prefix: string,
  model: any,
  field: string
): Promise<string> {
  const latest = await model.findFirst({
    orderBy: {
      [field]: "desc",
    },
    select: {
      [field]: true,
    },
  });

  if (!latest) {
    return `${prefix}000001`;
  }

  const current = latest[field] as string;
  const next =
    parseInt(current.slice(prefix.length), 10) + 1;

  return `${prefix}${next
    .toString()
    .padStart(6, "0")}`;
}

export async function generateOrganizationId() {
  return generateNextId(
    "ORG",
    prisma.organization,
    "organizationId"
  );
}

export async function generateCompetitionId() {
  return generateNextId(
    "COM",
    prisma.competition,
    "competitionId"
  );
}

export async function generateSeasonId() {
  return generateNextId(
    "SEA",
    prisma.season,
    "seasonId"
  );
}

export async function generateTeamId() {
  return generateNextId(
    "TEM",
    prisma.team,
    "teamId"
  );
}

export async function generatePlayerId() {
  return generateNextId(
    "PLY",
    prisma.player,
    "playerId"
  );
}

export async function generatePlayerSeasonId() {
  return generateNextId(
    "PSN",
    prisma.playerSeason,
    "playerSeasonId"
  );
}

export async function generateVenueId() {
  return generateNextId(
    "VEN",
    prisma.venue,
    "venueId"
  );
}

export async function generateMatchId() {
  return generateNextId(
    "MAT",
    prisma.match,
    "matchId"
  );
}

export async function generateOfficialId() {
  return generateNextId(
    "OFF",
    prisma.official,
    "officialId"
  );
}