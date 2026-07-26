import { OrganizationStatus } from "@prisma/client";

import prisma from "../../lib/prisma";
import { IdService } from "../../lib/id.service";

import { generateSlug } from "../../utils/slug";

import {
  ConflictError,
  NotFoundError,
} from "../../errors";

import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from "./dto";

import {
  toOrganizationSummaryDto,
  toOrganizationDetailsDto,
} from "./mapper";

export async function getOrganizations() {
  const organizations = await prisma.organization.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return organizations.map(toOrganizationSummaryDto);
}

export async function getOrganization(
  organizationId: string
) {
  const organization = await prisma.organization.findUnique({
    where: {
      organizationId,
    },
  });

  if (!organization) {
    throw new NotFoundError("Organization");
  }

  return toOrganizationDetailsDto(organization);
}

export async function createOrganization(
  dto: CreateOrganizationDto
) {
  const existing = await prisma.organization.findFirst({
    where: {
      OR: [
        { name: dto.name },
        { shortName: dto.shortName },
      ],
    },
  });

  if (existing) {
    throw new ConflictError(
      "Organization already exists."
    );
  }

  const organization = await prisma.organization.create({
    data: {
      organizationId: await IdService.generate("organization"),
      slug: generateSlug(dto.name),
      name: dto.name,
      shortName: dto.shortName,
      status: dto.status ?? OrganizationStatus.ACTIVE,
    },
  });

  return toOrganizationDetailsDto(organization);
}

export async function updateOrganization(
  organizationId: string,
  dto: UpdateOrganizationDto
) {
  const organization = await prisma.organization.findUnique({
    where: {
      organizationId,
    },
  });

  if (!organization) {
    throw new NotFoundError("Organization");
  }

  const data: any = {
    ...dto,
  };

  if (dto.name) {
    data.slug = generateSlug(dto.name);
  }

  const updated = await prisma.organization.update({
    where: {
      organizationId,
    },
    data,
  });

  return toOrganizationDetailsDto(updated);
}

export async function deleteOrganization(
  organizationId: string
) {
  const organization = await prisma.organization.findUnique({
    where: {
      organizationId,
    },
  });

  if (!organization) {
    throw new NotFoundError("Organization");
  }

  await prisma.organization.delete({
    where: {
      organizationId,
    },
  });
}