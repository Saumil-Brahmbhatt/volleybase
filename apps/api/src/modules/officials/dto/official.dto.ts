export interface OfficialSummaryDto {
  officialId: string;

  fullName: string;

  nationality: string;

  role: string;

  status: string;
}

export interface OfficialDetailsDto {
  officialId: string;

  fullName: string;

  nationality: string;

  role: string;

  status: string;

  createdAt: Date;

  updatedAt: Date;
}