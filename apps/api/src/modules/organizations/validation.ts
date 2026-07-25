import { z } from "zod";
import { OrganizationStatus } from "@prisma/client";

export const createOrganizationSchema = z.object({
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

  status: z
    .nativeEnum(OrganizationStatus)
    .optional(),
});

export const updateOrganizationSchema =
  createOrganizationSchema.partial();