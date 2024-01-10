import { PrismaPetImageRepository } from '@/repositories/prisma/prisma-pet-image-repository'
import { PetImageRemoveUseCase } from '@/use-cases/pet-image-remove'

export function MakePetImageRemoveUseCase() {
  const prismaPetImageRepository = new PrismaPetImageRepository()

  const petImageRemoveUseCase = new PetImageRemoveUseCase(
    prismaPetImageRepository,
  )

  return petImageRemoveUseCase
}
