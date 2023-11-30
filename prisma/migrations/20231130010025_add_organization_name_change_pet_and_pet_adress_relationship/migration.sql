/*
  Warnings:

  - You are about to drop the column `pet_id` on the `pet_location` table. All the data in the column will be lost.
  - Added the required column `name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petLocationId` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet_location" DROP CONSTRAINT "pet_location_pet_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "petLocationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet_location" DROP COLUMN "pet_id";

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_petLocationId_fkey" FOREIGN KEY ("petLocationId") REFERENCES "pet_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
