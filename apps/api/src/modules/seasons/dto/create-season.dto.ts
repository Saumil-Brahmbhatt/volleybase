import { SeasonStatus } from "@prisma/client";

export interface CreateSeasonDto {
  competitionId: string;

  name: string;

  shortName?: string;

  seasonYear: number;

  startDate: Date;

  endDate: Date;

  status?: SeasonStatus;
}