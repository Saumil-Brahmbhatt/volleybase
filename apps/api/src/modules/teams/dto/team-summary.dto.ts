export interface TeamSummaryDto {
  teamId: string;

  slug: string;

  organizationId: string;

  homeVenueId: string | null;

  name: string;

  shortName: string;

  abbreviation: string;

  city: string | null;

  foundedYear: number | null;

  status: string;
}