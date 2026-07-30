import { VenueStatus } from "@prisma/client";

export interface UpdateVenueDto {

  name?: string;

  city?: string;

  capacity?: number;

  status?: VenueStatus;
}