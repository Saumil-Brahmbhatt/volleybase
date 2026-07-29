import { PlayerStatus } from "@prisma/client";
import { z } from "zod";

const playerSeasonSchema = z.object({
  playerId: z.string().trim().min(1).max(50),

  teamId: z.string().trim().min(1).max(50),

  seasonId: z.string().trim().min(1).max(50),

  jerseyNumber: z
    .number()
    .int()
    .min(0)
    .max(99),

  isCaptain: z.boolean().optional(),

  isViceCaptain: z.boolean().optional(),

  isForeignPlayer: z.boolean().optional(),

  joinedAt: z.coerce.date().optional(),

  leftAt: z.coerce.date().optional(),

  status: z.nativeEnum(PlayerStatus).optional(),
});

export const createPlayerSeasonSchema = playerSeasonSchema
  .refine(
    (data) =>
      !data.joinedAt ||
      !data.leftAt ||
      data.leftAt > data.joinedAt,
    {
      message: "leftAt must be after joinedAt.",
      path: ["leftAt"],
    }
  )
  .refine(
    (data) => !(data.isCaptain && data.isViceCaptain),
    {
      message: "A player cannot be both captain and vice-captain.",
      path: ["isViceCaptain"],
    }
  );

export const updatePlayerSeasonSchema = playerSeasonSchema
  .omit({
    playerId: true,
    seasonId: true,
  })
  .partial()
  .refine(
    (data) =>
      !data.joinedAt ||
      !data.leftAt ||
      data.leftAt > data.joinedAt,
    {
      message: "leftAt must be after joinedAt.",
      path: ["leftAt"],
    }
  )
  .refine(
    (data) => !(data.isCaptain && data.isViceCaptain),
    {
      message: "A player cannot be both captain and vice-captain.",
      path: ["isViceCaptain"],
    }
  );

export type CreatePlayerSeasonInput = z.infer<
  typeof createPlayerSeasonSchema
>;

export type UpdatePlayerSeasonInput = z.infer<
  typeof updatePlayerSeasonSchema
>;