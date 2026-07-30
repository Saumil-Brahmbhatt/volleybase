import {
  OfficialRole,
  OfficialStatus,
} from "@prisma/client";
import { z } from "zod";

const officialSchema = z.object({
  fullName: z.string().min(2).max(100),

  nationality: z.string().min(2).max(100),

  role: z.nativeEnum(OfficialRole),

  status: z
    .nativeEnum(OfficialStatus)
    .default(OfficialStatus.ACTIVE),
});

export const createOfficialSchema =
  officialSchema;

export const updateOfficialSchema =
  officialSchema
    .partial()
    .refine(
      (data) => Object.keys(data).length > 0,
      {
        message:
          "At least one field must be provided.",
      }
    );