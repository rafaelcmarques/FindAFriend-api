/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `pet_image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pet_image_name_key" ON "pet_image"("name");
