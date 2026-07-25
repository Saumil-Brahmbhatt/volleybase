import { OrganizationStatus } from "@prisma/client";

export interface CreateOrganizationDto {
  name: string;

  shortName: string;

  foundedYear?: string;

  status?: OrganizationStatus;
}