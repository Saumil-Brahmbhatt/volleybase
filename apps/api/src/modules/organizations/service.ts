import prisma from "../../lib/prisma";

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
    return null;
  }

  return toOrganizationDetailsDto(organization);
}