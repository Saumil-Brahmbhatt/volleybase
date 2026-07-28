import { TeamStatus } from "@prisma/client";
import { z } from "zod";

const teamSchema = z.object({
  organizationId: z
    .string()
    .trim()
    .min(1),

  homeVenueId: z
    .string()
    .trim()
    .min(1)
    .optional(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  shortName: z
    .string()
    .trim()
    .min(2)
    .max(30),

  abbreviation: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .transform((value) => value.toUpperCase()),

  city: z
    .string()
    .trim()
    .max(100)
    .optional(),

  foundedYear: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),

  status: z
    .nativeEnum(TeamStatus)
    .optional(),
});

export const createTeamSchema = teamSchema;

export const updateTeamSchema = teamSchema
  .omit({
    organizationId: true,
  })
  .partial();