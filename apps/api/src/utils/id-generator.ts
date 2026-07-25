/**
 * VolleyBase Public ID Generator
 *
 * Example IDs:
 * PLY000001
 * TEM000001
 * ORG000001
 * COM000001
 * SEA000001
 * VEN000001
 * MAT000001
 * OFF000001
 */

export enum IdPrefix {
  PLAYER = "PLY",
  TEAM = "TEM",
  ORGANIZATION = "ORG",
  COMPETITION = "COM",
  SEASON = "SEA",
  VENUE = "VEN",
  MATCH = "MAT",
  OFFICIAL = "OFF",
}

const DEFAULT_LENGTH = 6;

/**
 * Pads a number with leading zeros.
 *
 * Example:
 * padNumber(25) => "000025"
 */
export const padNumber = (
  value: number,
  length: number = DEFAULT_LENGTH
): string => {
  return value.toString().padStart(length, "0");
};

/**
 * Builds a public ID.
 *
 * Example:
 * buildPublicId(IdPrefix.PLAYER, 25)
 * => PLY000025
 */
export const buildPublicId = (
  prefix: IdPrefix,
  sequence: number
): string => {
  return `${prefix}${padNumber(sequence)}`;
};

/**
 * Extracts the numeric part from a public ID.
 *
 * Example:
 * extractSequence("PLY000125")
 * => 125
 */
export const extractSequence = (
  publicId: string
): number => {
  const match = publicId.match(/\d+$/);

  if (!match) {
    return 0;
  }

  return Number(match[0]);
};

/**
 * Generates the next public ID.
 *
 * Example:
 * generateNextPublicId(
 *    IdPrefix.PLAYER,
 *    "PLY000125"
 * )
 *
 * => PLY000126
 */
export const generateNextPublicId = (
  prefix: IdPrefix,
  lastPublicId?: string | null
): string => {
  if (!lastPublicId) {
    return buildPublicId(prefix, 1);
  }

  const nextSequence = extractSequence(lastPublicId) + 1;

  return buildPublicId(prefix, nextSequence);
};