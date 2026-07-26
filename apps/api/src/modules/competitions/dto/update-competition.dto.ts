import {
  CompetitionStatus,
  CompetitionGender,
  CompetitionLevel,
  VolleyballDiscipline,
} from "@prisma/client";

export interface UpdateCompetitionDto {
  name?: string;

  shortName?: string;

  gender?: CompetitionGender;

  level?: CompetitionLevel;

  discipline?: VolleyballDiscipline;

  status?: CompetitionStatus;
}