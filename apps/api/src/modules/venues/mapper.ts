import { Venue } from "@prisma/client";
import {
  VenueDetailsDto,
  VenueSummaryDto,
} from "./dto/venue.dto";

export function toVenueSummaryDto(
  venue: Venue
): VenueSummaryDto {
  return {
    venueId: venue.venueId,
    slug: venue.slug,
    name: venue.name,
    city: venue.city,
    capacity: venue.capacity,
    status: venue.status,
  };
}

export function toVenueDetailsDto(
  venue: Venue
): VenueDetailsDto {
  return {
    venueId: venue.venueId,
    slug: venue.slug,
    name: venue.name,
    city: venue.city,
    capacity: venue.capacity,
    status: venue.status,
    createdAt: venue.createdAt,
    updatedAt: venue.updatedAt,
  };
}