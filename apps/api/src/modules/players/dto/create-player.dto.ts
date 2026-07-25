export interface CreatePlayerDto {
  slug: string;

  fullName: string;
  shortName: string;

  firstName: string;
  lastName: string;
  nativeName?: string;

  gender: string;

  nationality: string;

  birthDate: string;
  birthPlace: string;

  heightCm: number;
  weightKg?: number;

  spikeReachCm?: number;
  blockReachCm?: number;

  dominantHand: string;

  position: string;

  status: string;
}