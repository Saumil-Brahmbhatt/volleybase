export interface VenueSummaryDto {
  venueId: string;
  slug: string;

  name: string;
  city: string;

  capacity?: number | null;

  status: string;
}

export interface VenueDetailsDto {
  venueId: string;
  slug: string;

  name: string;
  city: string;

  capacity?: number | null;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}