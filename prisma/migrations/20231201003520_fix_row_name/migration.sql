/*
  Warnings:

  - You are about to drop the column `requirements` on the `pet_requirements` table. All the data in the column will be lost.
  - Added the required column `requirement` to the `pet_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet_requirements" DROP COLUMN "requirements",
ADD COLUMN     "requirement" TEXT NOT NULL;
