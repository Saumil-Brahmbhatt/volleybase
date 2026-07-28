export interface SeasonSummaryDto {
  seasonId: string;

  competitionId: string;

  slug: string;

  name: string;

  shortName: string | null;

  seasonYear: number;

  startDate: Date;

  endDate: Date;

  status: string;
}