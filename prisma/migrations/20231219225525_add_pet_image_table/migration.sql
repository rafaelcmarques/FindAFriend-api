-- CreateTable
CREATE TABLE "pet_image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_image" ADD CONSTRAINT "pet_image_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
