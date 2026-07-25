import { PrismaClient } from "@prisma/client";

export async function findOrganization(
  prisma: PrismaClient,
  organizationId: string
) {
  const organization = await prisma.organization.findUnique({
    where: { organizationId },
  });

  if (!organization) {
    throw new Error(`Organization '${organizationId}' not found.`);
  }

  return organization;
}

export async function findVenue(
  prisma: PrismaClient,
  venueId: string
) {
  const venue = await prisma.venue.findUnique({
    where: { venueId },
  });

  if (!venue) {
    throw new Error(`Venue '${venueId}' not found.`);
  }

  return venue;
}