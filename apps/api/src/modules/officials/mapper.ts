import { Official } from "@prisma/client";

import {
  OfficialSummaryDto,
  OfficialDetailsDto,
} from "./dto/official.dto";

export function toOfficialSummaryDto(
  official: Official
): OfficialSummaryDto {
  return {
    officialId: official.officialId,
    fullName: official.fullName,
    nationality: official.nationality,
    role: official.role,
    status: official.status,
  };
}

export function toOfficialDetailsDto(
  official: Official
): OfficialDetailsDto {
  return {
    officialId: official.officialId,
    fullName: official.fullName,
    nationality: official.nationality,
    role: official.role,
    status: official.status,
    createdAt: official.createdAt,
    updatedAt: official.updatedAt,
  };
}