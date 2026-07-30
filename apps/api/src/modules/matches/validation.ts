import { MatchStatus } from "@prisma/client";
import { z } from "zod";

const baseMatchSchema = z.object({
  seasonId: z.string(),

  venueId: z.string().optional(),

  homeTeamId: z.string(),

  awayTeamId: z.string(),

  matchNumber: z.number().int().positive().optional(),

  round: z.string().min(1).max(100),

  scheduledAt: z.coerce.date(),

  startedAt: z.coerce.date().optional(),

  endedAt: z.coerce.date().optional(),

  bestOfSets: z.number().int().positive(),

  winningSets: z.number().int().positive(),

  currentSet: z.number().int().min(0),

  homeSetsWon: z.number().int().min(0).default(0),

  awaySetsWon: z.number().int().min(0).default(0),

  status: z.nativeEnum(MatchStatus),
});

export const createMatchSchema = baseMatchSchema.refine(
  (data) => data.homeTeamId !== data.awayTeamId,
  {
    message: "Home and away teams cannot be the same.",
    path: ["awayTeamId"],
  }
);

export const updateMatchSchema = baseMatchSchema
  .partial()
  .refine(
    (data) =>
      !(
        data.homeTeamId &&
        data.awayTeamId &&
        data.homeTeamId === data.awayTeamId
      ),
    {
      message: "Home and away teams cannot be the same.",
      path: ["awayTeamId"],
    }
  )
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided.",
    }
  );