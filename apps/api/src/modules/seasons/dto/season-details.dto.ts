export interface SeasonDetailsDto {
  seasonId: string;

  competitionId: string;

  slug: string;

  name: string;

  shortName: string | null;

  seasonYear: number;

  startDate: Date;

  endDate: Date;

  status: string;

  createdAt: Date;

  updatedAt: Date;
}