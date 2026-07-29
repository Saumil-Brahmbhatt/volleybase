import {
  DominantHand,
  Gender,
  PlayerStatus,
  Position,
} from "@prisma/client";
import { z } from "zod";

const playerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  shortName: z
    .string()
    .trim()
    .min(2)
    .max(50),

  firstName: z
    .string()
    .trim()
    .min(2)
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(1)
    .max(50),

  nativeName: z
    .string()
    .trim()
    .max(100)
    .optional(),

  gender: z.nativeEnum(Gender),

  nationality: z
    .string()
    .trim()
    .min(2)
    .max(100),

  birthDate: z
    .coerce
    .date(),

  birthPlace: z
    .string()
    .trim()
    .max(100)
    .optional(),

  heightCm: z
    .number()
    .int()
    .min(100)
    .max(260),

  weightKg: z
    .number()
    .min(30)
    .max(180)
    .optional(),

  spikeReachCm: z
    .number()
    .int()
    .min(150)
    .max(450)
    .optional(),

  blockReachCm: z
    .number()
    .int()
    .min(150)
    .max(450)
    .optional(),

  dominantHand: z.nativeEnum(DominantHand),

  position: z.nativeEnum(Position),

  status: z
    .nativeEnum(PlayerStatus)
    .optional(),
});

export const createPlayerSchema = playerSchema.refine(
  (data) => data.birthDate <= new Date(),
  {
    message: "Birth date cannot be in the future.",
    path: ["birthDate"],
  }
);

export const updatePlayerSchema = playerSchema.partial();