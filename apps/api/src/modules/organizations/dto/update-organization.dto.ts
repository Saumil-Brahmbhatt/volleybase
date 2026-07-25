import { OrganizationStatus } from "@prisma/client";

export interface UpdateOrganizationDto {
  name?: string;

  shortName?: string;

  foundedYear?: string;

  status?: OrganizationStatus;
}