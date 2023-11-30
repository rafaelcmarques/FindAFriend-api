-- DropForeignKey
ALTER TABLE "pet_location" DROP CONSTRAINT "pet_location_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "pet_requirements" DROP CONSTRAINT "pet_requirements_pet_id_fkey";

-- AddForeignKey
ALTER TABLE "pet_location" ADD CONSTRAINT "pet_location_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_requirements" ADD CONSTRAINT "pet_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
