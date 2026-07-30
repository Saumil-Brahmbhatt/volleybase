import { VenueStatus } from "@prisma/client";

export interface CreateVenueDto {

  name: string;

  city: string;

  capacity?: number;

  status?: VenueStatus;
}