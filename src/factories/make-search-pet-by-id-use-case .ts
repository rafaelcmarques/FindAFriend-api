import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetByIdUseCase } from '@/use-cases/search-pet-by-id'

export function MakeSearchPetById() {
  const prismaPetRepository = new PrismaPetRepository()

  const searchPetByIdUseCase = new SearchPetByIdUseCase(prismaPetRepository)

  return searchPetByIdUseCase
}
