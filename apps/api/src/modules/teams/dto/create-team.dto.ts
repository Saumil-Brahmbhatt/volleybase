import { TeamStatus } from "@prisma/client";

export interface CreateTeamDto {
  organizationId: string;

  homeVenueId?: string;

  name: string;

  shortName: string;

  abbreviation: string;

  city?: string;

  foundedYear?: number;

  status?: TeamStatus;
}