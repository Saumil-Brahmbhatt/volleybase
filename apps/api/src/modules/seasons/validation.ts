import { SeasonStatus } from "@prisma/client";
import { z } from "zod";

const seasonSchema = z.object({
  competitionId: z.string().trim().min(1),

  name: z.string().trim().min(2).max(100),

  shortName: z.string().trim().min(2).max(20).optional(),

  seasonYear: z.number().int().min(1900).max(2100),

  startDate: z.coerce.date(),

  endDate: z.coerce.date(),

  status: z.nativeEnum(SeasonStatus).optional(),
});

export const createSeasonSchema = seasonSchema.refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be after start date.",
    path: ["endDate"],
  }
);

export const updateSeasonSchema = seasonSchema
  .omit({
    competitionId: true,
  })
  .partial();