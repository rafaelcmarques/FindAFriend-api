/*
  Warnings:

  - You are about to drop the column `petLocationId` on the `pet` table. All the data in the column will be lost.
  - Added the required column `pet_location_id` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_petLocationId_fkey";

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "petLocationId",
ADD COLUMN     "pet_location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_pet_location_id_fkey" FOREIGN KEY ("pet_location_id") REFERENCES "pet_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
