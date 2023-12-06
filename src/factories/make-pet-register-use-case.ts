import { PetRegisterUseCase } from '@/use-cases/pet-register'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PrismaPetLocationRepository } from '@/repositories/prisma/prisma-pet-location-repository'
import { PrismaPetRequirementsRepository } from '@/repositories/prisma/prisma-pet-requirements-repository'

export function MakePetRegisterUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const prismaPetLocationRepository = new PrismaPetLocationRepository()
  const prismaPetRequirementsRepository = new PrismaPetRequirementsRepository()

  const petRegisterUseCase = new PetRegisterUseCase(
    prismaPetRepository,
    prismaPetLocationRepository,
    prismaPetRequirementsRepository,
  )

  return petRegisterUseCase
}
