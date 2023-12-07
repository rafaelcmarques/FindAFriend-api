import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsByCityUseCase } from '@/use-cases/search-pets-by-city'

export function MakeSearchPetsByCity() {
  const prismaPetRepository = new PrismaPetRepository()

  const searchPetsByCityUseCase = new SearchPetsByCityUseCase(
    prismaPetRepository,
  )

  return searchPetsByCityUseCase
}
