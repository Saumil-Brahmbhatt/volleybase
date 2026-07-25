import {
  OrganizationStatus,
  PrismaClient,
} from "@prisma/client";

import { generateSlug } from "../../src/utils/slug";
import { runSeed } from "./helper";

export async function seedOrganizations(
  prisma: PrismaClient
): Promise<void> {
  await runSeed("Organizations", async () => {
    const organization = {
      organizationId: "ORG000001",

      name: "Prime Volleyball League",
      shortName: "PVL",

      slug: generateSlug("Prime Volleyball League"),

      status: OrganizationStatus.ACTIVE,
    };

    await prisma.organization.upsert({
      where: {
        organizationId: organization.organizationId,
      },

      update: organization,

      create: organization,
    });

    return 1;
  });
}