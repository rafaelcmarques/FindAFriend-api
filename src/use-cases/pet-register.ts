import { prisma } from '@/lib/prisma'
import { PetLocationRepository } from '@/repositories/pet-location-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { PetRequirementsRepository } from '@/repositories/pet-requirements-repository'

interface PetRegisterParams {
  name: string
  description: string
  age: string
  size: string
  energy: string
  independence_level: string
  animal_type: string
  environment: string

  latitude: string
  longitude: string

  requirements: string[]
  organization_id: string
}

export class PetRegisterUseCase {
  constructor(
    private petRepository: PetRepository,
    private petLocationRepository: PetLocationRepository,
    private petRequirements: PetRequirementsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energy,
    independence_level,
    animal_type,
    environment,
    latitude,
    longitude,
    requirements,
    organization_id,
  }: PetRegisterParams) {
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      size,
      energy,
      independence_level,
      animal_type,
      environment,
      organization: { connect: { id: organization_id } },
    })

    await this.petLocationRepository.create({
      latitude,
      longitude,
      pet: { connect: { id: pet.id } },
    })

    const petRequirementsData = requirements.map((requirement) => ({
      requirement,
      pet_id: pet.id,
    }))

    await this.petRequirements.create(petRequirementsData)
  }
}
