/**
 * Converts text into a URL-friendly slug.
 *
 * Example:
 * "Prime Volleyball League"
 * -> "prime-volleyball-league"
 */

export const generateSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Creates a unique slug by appending a number if needed.
 *
 * Example:
 * ran-takahashi
 * ran-takahashi-2
 * ran-takahashi-3
 */

export const appendSlugSuffix = (
  slug: string,
  suffix: number
): string => {
  return `${slug}-${suffix}`;
};