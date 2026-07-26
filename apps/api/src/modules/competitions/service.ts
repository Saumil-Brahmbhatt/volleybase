import {
  CompetitionStatus,
} from "@prisma/client";

import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";

import { generateSlug } from "../../utils/slug";

import {
  ConflictError,
  NotFoundError,
} from "../../errors";

import {
  CreateCompetitionDto,
  UpdateCompetitionDto,
} from "./dto";

import {
  toCompetitionSummaryDto,
  toCompetitionDetailsDto,
} from "./mapper";

export async function getCompetitions() {
  const competitions = await prisma.competition.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return competitions.map(toCompetitionSummaryDto);
}

export async function getCompetition(
  competitionId: string
) {
  const competition = await prisma.competition.findUnique({
    where: {
      competitionId,
    },
  });

  if (!competition) {
    throw new NotFoundError("Competition");
  }

  return toCompetitionDetailsDto(competition);
}

export async function createCompetition(
  dto: CreateCompetitionDto
) {
  // Check organization exists
  const organization = await prisma.organization.findUnique({
    where: {
      organizationId: dto.organizationId,
    },
  });

  if (!organization) {
    throw new NotFoundError("Organization");
  }

  // Check duplicate competition within the same organization
  const existing = await prisma.competition.findFirst({
    where: {
      organizationId: dto.organizationId,
      OR: [
        {
          name: dto.name,
        },
        {
          shortName: dto.shortName,
        },
      ],
    },
  });

  if (existing) {
    throw new ConflictError(
      "Competition already exists."
    );
  }

  const competition = await prisma.competition.create({
    data: {
      competitionId: await IdService.generate(
        "competition"
      ),

      organizationId: dto.organizationId,

      slug: generateSlug(dto.name),

      name: dto.name,

      shortName: dto.shortName,

      gender: dto.gender,

      level: dto.level,

      discipline: dto.discipline,

      status:
        dto.status ??
        CompetitionStatus.ACTIVE,
    },
  });

  return toCompetitionDetailsDto(
    competition
  );
}

export async function updateCompetition(
  competitionId: string,
  dto: UpdateCompetitionDto
) {
  const competition = await prisma.competition.findUnique({
    where: {
      competitionId,
    },
  });

  if (!competition) {
    throw new NotFoundError("Competition");
  }

  const data: any = {
    ...dto,
  };

  if (dto.name) {
    data.slug = generateSlug(dto.name);
  }

  const updated = await prisma.competition.update({
    where: {
      competitionId,
    },
    data,
  });

  return toCompetitionDetailsDto(updated);
}

export async function deleteCompetition(
  competitionId: string
) {
  const competition = await prisma.competition.findUnique({
    where: {
      competitionId,
    },
  });

  if (!competition) {
    throw new NotFoundError("Competition");
  }

  await prisma.competition.delete({
    where: {
      competitionId,
    },
  });
}