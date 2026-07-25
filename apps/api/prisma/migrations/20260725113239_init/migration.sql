-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('S', 'OH', 'OP', 'MB', 'L');

-- CreateEnum
CREATE TYPE "public"."DominantHand" AS ENUM ('LEFT', 'RIGHT');

-- CreateEnum
CREATE TYPE "public"."PlayerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'INJURED', 'RETIRED');

-- CreateEnum
CREATE TYPE "public"."TeamStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISSOLVED');

-- CreateEnum
CREATE TYPE "public"."CompetitionGender" AS ENUM ('MEN', 'WOMEN', 'MIXED');

-- CreateEnum
CREATE TYPE "public"."CompetitionLevel" AS ENUM ('CLUB', 'NATIONAL', 'SCHOOL', 'COLLEGE');

-- CreateEnum
CREATE TYPE "public"."VolleyballDiscipline" AS ENUM ('INDOOR', 'BEACH', 'SNOW', 'SITTING');

-- CreateEnum
CREATE TYPE "public"."SeasonStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."MatchStatus" AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'CANCELLED', 'POSTPONED');

-- CreateEnum
CREATE TYPE "public"."OfficialRole" AS ENUM ('FIRST_REFEREE', 'SECOND_REFEREE', 'SCORER', 'LINE_JUDGE');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('POINT', 'ACE', 'BLOCK', 'ATTACK', 'ERROR', 'TIMEOUT', 'SUBSTITUTION', 'CHALLENGE', 'CARD');

-- CreateEnum
CREATE TYPE "public"."CompetitionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."VenueStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."OfficialStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "public"."OrganizationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "public"."Competition" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "gender" "public"."CompetitionGender" NOT NULL,
    "level" "public"."CompetitionLevel" NOT NULL,
    "discipline" "public"."VolleyballDiscipline" NOT NULL,
    "status" "public"."CompetitionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Match" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "venueId" TEXT,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "matchNumber" INTEGER,
    "round" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "bestOfSets" INTEGER NOT NULL,
    "winningSets" INTEGER NOT NULL,
    "currentSet" INTEGER NOT NULL,
    "homeSetsWon" INTEGER NOT NULL DEFAULT 0,
    "awaySetsWon" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."MatchStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MatchEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "matchSetId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerId" TEXT,
    "eventType" "public"."EventType" NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MatchOfficial" (
    "id" TEXT NOT NULL,
    "matchOfficialId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "officialId" TEXT NOT NULL,
    "role" "public"."OfficialRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchOfficial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MatchSet" (
    "id" TEXT NOT NULL,
    "matchSetId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "homeScore" INTEGER NOT NULL DEFAULT 0,
    "awayScore" INTEGER NOT NULL DEFAULT 0,
    "durationMinutes" INTEGER,
    "winnerTeamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Official" (
    "id" TEXT NOT NULL,
    "officialId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "role" "public"."OfficialRole" NOT NULL,
    "status" "public"."OfficialStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Official_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Organization" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "foundedYear" INTEGER,
    "status" "public"."OrganizationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nativeName" TEXT,
    "gender" "public"."Gender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "heightCm" INTEGER NOT NULL,
    "weightKg" INTEGER,
    "spikeReachCm" INTEGER,
    "blockReachCm" INTEGER,
    "dominantHand" "public"."DominantHand" NOT NULL,
    "position" "public"."Position" NOT NULL,
    "status" "public"."PlayerStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlayerMatchStats" (
    "id" TEXT NOT NULL,
    "playerMatchStatsId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "setsPlayed" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "attackPoints" INTEGER NOT NULL DEFAULT 0,
    "blockPoints" INTEGER NOT NULL DEFAULT 0,
    "acePoints" INTEGER NOT NULL DEFAULT 0,
    "attackAttempts" INTEGER NOT NULL DEFAULT 0,
    "attackErrors" INTEGER NOT NULL DEFAULT 0,
    "receptionAttempts" INTEGER NOT NULL DEFAULT 0,
    "receptionErrors" INTEGER NOT NULL DEFAULT 0,
    "digs" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "serviceAttempts" INTEGER NOT NULL DEFAULT 0,
    "serviceErrors" INTEGER NOT NULL DEFAULT 0,
    "yellowCards" INTEGER NOT NULL DEFAULT 0,
    "redCards" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlayerSeason" (
    "id" TEXT NOT NULL,
    "playerSeasonId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "jerseyNumber" INTEGER NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isViceCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isForeignPlayer" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3),
    "leftAt" TIMESTAMP(3),
    "status" "public"."PlayerStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Season" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seasonYear" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."SeasonStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Standing" (
    "id" TEXT NOT NULL,
    "standingId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "setsWon" INTEGER NOT NULL DEFAULT 0,
    "setsLost" INTEGER NOT NULL DEFAULT 0,
    "pointsWon" INTEGER NOT NULL DEFAULT 0,
    "pointsLost" INTEGER NOT NULL DEFAULT 0,
    "leaguePoints" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "organizationId" TEXT,
    "homeVenueId" TEXT,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "city" TEXT,
    "foundedYear" INTEGER,
    "status" "public"."TeamStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamMatchStats" (
    "id" TEXT NOT NULL,
    "teamMatchStatsId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "attackPoints" INTEGER NOT NULL DEFAULT 0,
    "blockPoints" INTEGER NOT NULL DEFAULT 0,
    "acePoints" INTEGER NOT NULL DEFAULT 0,
    "attackAttempts" INTEGER NOT NULL DEFAULT 0,
    "attackErrors" INTEGER NOT NULL DEFAULT 0,
    "receptionAttempts" INTEGER NOT NULL DEFAULT 0,
    "receptionErrors" INTEGER NOT NULL DEFAULT 0,
    "digs" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "serviceAttempts" INTEGER NOT NULL DEFAULT 0,
    "serviceErrors" INTEGER NOT NULL DEFAULT 0,
    "yellowCards" INTEGER NOT NULL DEFAULT 0,
    "redCards" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Venue" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "capacity" INTEGER,
    "status" "public"."VenueStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_competitionId_key" ON "public"."Competition"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_slug_key" ON "public"."Competition"("slug");

-- CreateIndex
CREATE INDEX "Competition_organizationId_idx" ON "public"."Competition"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchId_key" ON "public"."Match"("matchId");

-- CreateIndex
CREATE INDEX "Match_seasonId_idx" ON "public"."Match"("seasonId");

-- CreateIndex
CREATE INDEX "Match_venueId_idx" ON "public"."Match"("venueId");

-- CreateIndex
CREATE INDEX "Match_homeTeamId_idx" ON "public"."Match"("homeTeamId");

-- CreateIndex
CREATE INDEX "Match_awayTeamId_idx" ON "public"."Match"("awayTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchEvent_eventId_key" ON "public"."MatchEvent"("eventId");

-- CreateIndex
CREATE INDEX "MatchEvent_matchId_idx" ON "public"."MatchEvent"("matchId");

-- CreateIndex
CREATE INDEX "MatchEvent_matchSetId_idx" ON "public"."MatchEvent"("matchSetId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchOfficial_matchOfficialId_key" ON "public"."MatchOfficial"("matchOfficialId");

-- CreateIndex
CREATE INDEX "MatchOfficial_matchId_idx" ON "public"."MatchOfficial"("matchId");

-- CreateIndex
CREATE INDEX "MatchOfficial_officialId_idx" ON "public"."MatchOfficial"("officialId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSet_matchSetId_key" ON "public"."MatchSet"("matchSetId");

-- CreateIndex
CREATE INDEX "MatchSet_matchId_idx" ON "public"."MatchSet"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Official_officialId_key" ON "public"."Official"("officialId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationId_key" ON "public"."Organization"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "public"."Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "public"."Player"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_slug_key" ON "public"."Player"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatchStats_playerMatchStatsId_key" ON "public"."PlayerMatchStats"("playerMatchStatsId");

-- CreateIndex
CREATE INDEX "PlayerMatchStats_matchId_idx" ON "public"."PlayerMatchStats"("matchId");

-- CreateIndex
CREATE INDEX "PlayerMatchStats_playerId_idx" ON "public"."PlayerMatchStats"("playerId");

-- CreateIndex
CREATE INDEX "PlayerMatchStats_teamId_idx" ON "public"."PlayerMatchStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatchStats_matchId_playerId_key" ON "public"."PlayerMatchStats"("matchId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSeason_playerSeasonId_key" ON "public"."PlayerSeason"("playerSeasonId");

-- CreateIndex
CREATE INDEX "PlayerSeason_playerId_idx" ON "public"."PlayerSeason"("playerId");

-- CreateIndex
CREATE INDEX "PlayerSeason_teamId_idx" ON "public"."PlayerSeason"("teamId");

-- CreateIndex
CREATE INDEX "PlayerSeason_seasonId_idx" ON "public"."PlayerSeason"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSeason_playerId_seasonId_key" ON "public"."PlayerSeason"("playerId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_seasonId_key" ON "public"."Season"("seasonId");

-- CreateIndex
CREATE INDEX "Season_competitionId_idx" ON "public"."Season"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "Standing_standingId_key" ON "public"."Standing"("standingId");

-- CreateIndex
CREATE INDEX "Standing_seasonId_idx" ON "public"."Standing"("seasonId");

-- CreateIndex
CREATE INDEX "Standing_teamId_idx" ON "public"."Standing"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Standing_seasonId_teamId_key" ON "public"."Standing"("seasonId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "public"."Team"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "public"."Team"("slug");

-- CreateIndex
CREATE INDEX "Team_organizationId_idx" ON "public"."Team"("organizationId");

-- CreateIndex
CREATE INDEX "Team_homeVenueId_idx" ON "public"."Team"("homeVenueId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatchStats_teamMatchStatsId_key" ON "public"."TeamMatchStats"("teamMatchStatsId");

-- CreateIndex
CREATE INDEX "TeamMatchStats_matchId_idx" ON "public"."TeamMatchStats"("matchId");

-- CreateIndex
CREATE INDEX "TeamMatchStats_teamId_idx" ON "public"."TeamMatchStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatchStats_matchId_teamId_key" ON "public"."TeamMatchStats"("matchId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_venueId_key" ON "public"."Venue"("venueId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_slug_key" ON "public"."Venue"("slug");

-- AddForeignKey
ALTER TABLE "public"."Competition" ADD CONSTRAINT "Competition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchEvent" ADD CONSTRAINT "MatchEvent_matchSetId_fkey" FOREIGN KEY ("matchSetId") REFERENCES "public"."MatchSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchOfficial" ADD CONSTRAINT "MatchOfficial_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchOfficial" ADD CONSTRAINT "MatchOfficial_officialId_fkey" FOREIGN KEY ("officialId") REFERENCES "public"."Official"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchSet" ADD CONSTRAINT "MatchSet_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerSeason" ADD CONSTRAINT "PlayerSeason_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerSeason" ADD CONSTRAINT "PlayerSeason_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerSeason" ADD CONSTRAINT "PlayerSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Season" ADD CONSTRAINT "Season_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "public"."Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Standing" ADD CONSTRAINT "Standing_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Standing" ADD CONSTRAINT "Standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_homeVenueId_fkey" FOREIGN KEY ("homeVenueId") REFERENCES "public"."Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamMatchStats" ADD CONSTRAINT "TeamMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamMatchStats" ADD CONSTRAINT "TeamMatchStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
