import prisma from "../src/lib/prisma";

import {
  seedOrganizations,
} from "./seeds";

async function main() {
  console.log("🏐 VolleyBase Seed");

  await seedOrganizations(prisma);

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });