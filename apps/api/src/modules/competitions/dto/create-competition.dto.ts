import {
  CompetitionStatus,
  CompetitionGender,
  CompetitionLevel,
  VolleyballDiscipline,
} from "@prisma/client";

export interface CreateCompetitionDto {
  organizationId: string;

  name: string;

  shortName: string;

  gender: CompetitionGender;

  level: CompetitionLevel;

  discipline: VolleyballDiscipline;

  status?: CompetitionStatus;
}