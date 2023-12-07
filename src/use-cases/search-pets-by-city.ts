import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseRequest {
  query: string
  page: number
}

interface SearchPetsUseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsUseRequest): Promise<SearchPetsUseResponse> {
    const pets = await this.petRepository.searchMany(query, page)
    return { pets }
  }
}
