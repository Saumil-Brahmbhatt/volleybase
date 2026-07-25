import { Organization } from "@prisma/client";

import {
  OrganizationSummaryDto,
  OrganizationDetailsDto,
} from "./dto";

export const toOrganizationSummaryDto = (
  organization: Organization
): OrganizationSummaryDto => ({
  organizationId: organization.organizationId,

  slug: organization.slug,

  name: organization.name,

  shortName: organization.shortName,

  status: organization.status,
});

export const toOrganizationDetailsDto = (
  organization: Organization
): OrganizationDetailsDto => ({
  organizationId: organization.organizationId,

  slug: organization.slug,

  name: organization.name,

  shortName: organization.shortName,

  status: organization.status,
});