/*
  Warnings:

  - Added the required column `city` to the `org_adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `pet_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `pet_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `pet_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `pet_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `pet_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org_adress" ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet_location" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;
