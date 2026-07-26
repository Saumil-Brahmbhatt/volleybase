-- DropForeignKey
ALTER TABLE "public"."Competition" DROP CONSTRAINT "Competition_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Competition" ADD CONSTRAINT "Competition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;
