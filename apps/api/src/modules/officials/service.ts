import prisma from "../../lib/prisma";
import { generateOfficialId } from "../../utils/id-generator";

import { CreateOfficialDto } from "./dto/create-official.dto";
import { UpdateOfficialDto } from "./dto/update-official.dto";
import {
  OfficialDetailsDto,
  OfficialSummaryDto,
} from "./dto/official.dto";

import {
  toOfficialDetailsDto,
  toOfficialSummaryDto,
} from "./mapper";

export async function getOfficials(): Promise<OfficialSummaryDto[]> {
  const officials = await prisma.official.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return officials.map(toOfficialSummaryDto);
}

export async function getOfficial(
  officialId: string
): Promise<OfficialDetailsDto> {
  const official = await prisma.official.findUnique({
    where: {
      officialId,
    },
  });

  if (!official) {
    throw new Error("Official not found.");
  }

  return toOfficialDetailsDto(official);
}

export async function createOfficial(
  data: CreateOfficialDto
): Promise<OfficialDetailsDto> {
  const official = await prisma.official.create({
    data: {
      officialId: await generateOfficialId(),
      ...data,
    },
  });

  return toOfficialDetailsDto(official);
}

export async function updateOfficial(
  officialId: string,
  data: UpdateOfficialDto
): Promise<OfficialDetailsDto> {
  const existing = await prisma.official.findUnique({
    where: {
      officialId,
    },
  });

  if (!existing) {
    throw new Error("Official not found.");
  }

  const updated = await prisma.official.update({
    where: {
      officialId,
    },
    data,
  });

  return toOfficialDetailsDto(updated);
}

export async function deleteOfficial(
  officialId: string
): Promise<void> {
  const existing = await prisma.official.findUnique({
    where: {
      officialId,
    },
  });

  if (!existing) {
    throw new Error("Official not found.");
  }

  await prisma.official.delete({
    where: {
      officialId,
    },
  });
}