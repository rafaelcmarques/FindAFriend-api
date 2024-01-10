-- DropForeignKey
ALTER TABLE "pet_image" DROP CONSTRAINT "pet_image_pet_id_fkey";

-- AddForeignKey
ALTER TABLE "pet_image" ADD CONSTRAINT "pet_image_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
