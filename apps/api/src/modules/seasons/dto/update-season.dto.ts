import { SeasonStatus } from "@prisma/client";

export interface UpdateSeasonDto {
  name?: string;

  shortName?: string;

  seasonYear?: number;

  startDate?: Date;

  endDate?: Date;

  status?: SeasonStatus;
}