import {
  OfficialRole,
  OfficialStatus,
} from "@prisma/client";

export interface UpdateOfficialDto {
  fullName?: string;

  nationality?: string;

  role?: OfficialRole;

  status?: OfficialStatus;
}