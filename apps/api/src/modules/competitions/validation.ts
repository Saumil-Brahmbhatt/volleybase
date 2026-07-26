import {
  CompetitionStatus,
  CompetitionGender,
  CompetitionLevel,
  VolleyballDiscipline,
} from "@prisma/client";
import { z } from "zod";

export const createCompetitionSchema = z.object({
  organizationId: z
    .string()
    .trim()
    .min(1),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  shortName: z
    .string()
    .trim()
    .min(2)
    .max(20),

  gender: z.nativeEnum(CompetitionGender),

  level: z.nativeEnum(CompetitionLevel),

  discipline: z.nativeEnum(VolleyballDiscipline),

  status: z
    .nativeEnum(CompetitionStatus)
    .optional(),
});

export const updateCompetitionSchema =
  createCompetitionSchema
    .omit({
      organizationId: true,
    })
    .partial();