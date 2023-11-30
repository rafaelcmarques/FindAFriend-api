/*
  Warnings:

  - A unique constraint covering the columns `[organization_id]` on the table `org_adress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "org_adress" DROP CONSTRAINT "org_adress_organization_id_fkey";

-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "org_adress_organization_id_key" ON "org_adress"("organization_id");

-- AddForeignKey
ALTER TABLE "org_adress" ADD CONSTRAINT "org_adress_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
