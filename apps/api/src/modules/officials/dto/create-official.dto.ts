import {
  OfficialRole,
  OfficialStatus,
} from "@prisma/client";

export interface CreateOfficialDto {
  fullName: string;

  nationality: string;

  role: OfficialRole;

  status?: OfficialStatus;
}