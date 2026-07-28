import { PlayerStatus } from "@prisma/client";

import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";
import { generateSlug } from "../../utils/slug";

import {
  ConflictError,
  NotFoundError,
} from "../../errors";

import {
  CreatePlayerDto,
  UpdatePlayerDto,
} from "./dto";

import {
  toPlayerSummaryDto,
  toPlayerDetailsDto,
} from "./mapper";

export async function getPlayers() {
  const players = await prisma.player.findMany({
    orderBy: {
      fullName: "asc",
    },
  });

  return players.map(toPlayerSummaryDto);
}

export async function getPlayer(
  playerId: string
) {
  const player = await prisma.player.findUnique({
    where: {
      playerId,
    },
  });

  if (!player) {
    throw new NotFoundError("Player");
  }

  return toPlayerDetailsDto(player);
}

export async function createPlayer(
  dto: CreatePlayerDto
) {
  const existing = await prisma.player.findFirst({
    where: {
      fullName: dto.fullName,
      birthDate: dto.birthDate,
    },
  });

  if (existing) {
    throw new ConflictError(
      "Player already exists."
    );
  }

  const player = await prisma.player.create({
    data: {
      playerId: await IdService.generate("player"),

      slug: generateSlug(dto.fullName),

      fullName: dto.fullName,
      shortName: dto.shortName,

      firstName: dto.firstName,
      lastName: dto.lastName,

      nativeName: dto.nativeName,

      gender: dto.gender,

      nationality: dto.nationality,

      birthDate: dto.birthDate,
      birthPlace: dto.birthPlace,

      heightCm: dto.heightCm,
      weightKg: dto.weightKg,

      spikeReachCm: dto.spikeReachCm,
      blockReachCm: dto.blockReachCm,

      dominantHand: dto.dominantHand,

      position: dto.position,

      status:
        dto.status ??
        PlayerStatus.ACTIVE,
    },
  });

  return toPlayerDetailsDto(player);
}

export async function updatePlayer(
  playerId: string,
  dto: UpdatePlayerDto
) {
  const player = await prisma.player.findUnique({
    where: {
      playerId,
    },
  });

  if (!player) {
    throw new NotFoundError("Player");
  }

  const data: any = {
    ...dto,
  };

  if (dto.fullName) {
    data.slug = generateSlug(dto.fullName);
  }

  const updated = await prisma.player.update({
    where: {
      playerId,
    },
    data,
  });

  return toPlayerDetailsDto(updated);
}

export async function deletePlayer(
  playerId: string
) {
  const player = await prisma.player.findUnique({
    where: {
      playerId,
    },
  });

  if (!player) {
    throw new NotFoundError("Player");
  }

  await prisma.player.delete({
    where: {
      playerId,
    },
  });
}