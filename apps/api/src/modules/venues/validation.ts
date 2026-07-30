import { VenueStatus } from "@prisma/client";
import { z } from "zod";

const venueSchema = z.object({

  name: z.string().min(2).max(100),

  city: z.string().min(2).max(100),

  capacity: z.number().int().positive().optional(),

  status: z.nativeEnum(VenueStatus).default(VenueStatus.ACTIVE),
});

export const createVenueSchema = venueSchema;

export const updateVenueSchema = venueSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided.",
    }
  );