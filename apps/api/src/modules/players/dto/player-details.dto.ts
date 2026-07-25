export interface PlayerDetailsDto {
  playerId: string;
  slug: string;

  fullName: string;
  shortName: string;

  firstName: string;
  lastName: string;
  nativeName: string | null;

  gender: string;

  nationality: string;

  birthDate: string;
  birthPlace: string;

  heightCm: number;
  weightKg: number | null;

  spikeReachCm: number | null;
  blockReachCm: number | null;

  dominantHand: string;

  position: string;

  status: string;
}