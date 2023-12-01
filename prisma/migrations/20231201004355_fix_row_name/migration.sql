/*
  Warnings:

  - You are about to drop the column `independece_level` on the `pet` table. All the data in the column will be lost.
  - Added the required column `independence_level` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "independece_level",
ADD COLUMN     "independence_level" TEXT NOT NULL;
