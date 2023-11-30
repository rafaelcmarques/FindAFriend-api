/*
  Warnings:

  - You are about to drop the column `pet_location_id` on the `pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pet_id]` on the table `pet_location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pet_id` to the `pet_location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_pet_location_id_fkey";

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "pet_location_id";

-- AlterTable
ALTER TABLE "pet_location" ADD COLUMN     "pet_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pet_location_pet_id_key" ON "pet_location"("pet_id");

-- AddForeignKey
ALTER TABLE "pet_location" ADD CONSTRAINT "pet_location_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
