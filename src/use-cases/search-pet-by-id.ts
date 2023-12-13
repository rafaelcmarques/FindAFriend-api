import { PetNotFoundError } from '@/errors/pet-not-found-error'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseRequest {
  id: string
}

interface SearchPetsUseResponse {
  pet: Pet | null
}

export class SearchPetByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: SearchPetsUseRequest): Promise<SearchPetsUseResponse> {
    const pet = await this.petRepository.searchById(id)
    if (!pet) {
      throw new PetNotFoundError()
    }
    return { pet }
  }
}
