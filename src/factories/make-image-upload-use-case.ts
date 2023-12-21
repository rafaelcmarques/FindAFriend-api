import { PrismaPetImageRepository } from '@/repositories/prisma/prisma-pet-image-repository'
import { PetImageUploadUseCase } from '@/use-cases/pet-image-upload'

export function MakePetImageUseCase() {
  const prismaPetImageRepository = new PrismaPetImageRepository()

  const petImageUploadUseCase = new PetImageUploadUseCase(
    prismaPetImageRepository,
  )

  return petImageUploadUseCase
}
