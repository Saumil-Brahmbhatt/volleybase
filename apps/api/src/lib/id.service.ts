import prisma from "./prisma";

import {
  IdPrefix,
  generateNextPublicId,
} from "../utils/id-generator";

type Entity =
  | "player"
  | "team"
  | "organization"
  | "competition"
  | "season"
  | "venue"
  | "match"
  | "official";

const CONFIG = {
  player: {
    model: prisma.player,
    field: "playerId",
    prefix: IdPrefix.PLAYER,
  },

  team: {
    model: prisma.team,
    field: "teamId",
    prefix: IdPrefix.TEAM,
  },

  organization: {
    model: prisma.organization,
    field: "organizationId",
    prefix: IdPrefix.ORGANIZATION,
  },

  competition: {
    model: prisma.competition,
    field: "competitionId",
    prefix: IdPrefix.COMPETITION,
  },

  season: {
    model: prisma.season,
    field: "seasonId",
    prefix: IdPrefix.SEASON,
  },

  venue: {
    model: prisma.venue,
    field: "venueId",
    prefix: IdPrefix.VENUE,
  },

  match: {
    model: prisma.match,
    field: "matchId",
    prefix: IdPrefix.MATCH,
  },

  official: {
    model: prisma.official,
    field: "officialId",
    prefix: IdPrefix.OFFICIAL,
  },
} as const;

export class IdService {
  static async generate(entity: Entity): Promise<string> {
    const config = CONFIG[entity];

    const last = await config.model.findFirst({
      orderBy: {
        [config.field]: "desc",
      },
      select: {
        [config.field]: true,
      },
    });

    const lastId = last?.[config.field] as string | undefined;

    return generateNextPublicId(
      config.prefix,
      lastId
    );
  }
}