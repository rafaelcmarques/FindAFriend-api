import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseRequest {
  city: string
  page: number
  type?: string
  age?: string
  size?: string
  energy?: string
  independence_level?: string
  environment?: string
}

export class SearchPetsByCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    page,
    type,
    age,
    size,
    energy,
    independence_level,
    environment,
  }: SearchPetsUseRequest): Promise<Pet[]> {
    const pets = await this.petRepository.searchMany({
      city,
      page,
      type,
      age,
      size,
      energy,
      independence_level,
      environment,
    })
    return pets
  }
}
