/*
  Warnings:

  - You are about to drop the column `requirenebts` on the `pet_requirements` table. All the data in the column will be lost.
  - Added the required column `requirements` to the `pet_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet_requirements" DROP COLUMN "requirenebts",
ADD COLUMN     "requirements" TEXT NOT NULL;
