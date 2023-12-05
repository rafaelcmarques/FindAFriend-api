import { prisma } from '@/lib/prisma'
import { PrismaPetRepository } from '@/repositories/prisma-pet-repository'
import { PrismaPetLocationRepository } from '@/repositories/prisma-pet-location-repository'
import { PrismaPetRequirementsRepository } from '@/repositories/prisma-pet-requirements-repository'

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

export async function petRegisterUseCase({
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
  const organization = await prisma.organization.findFirst({
    where: {
      id: organization_id,
    },
  })

  if (!organization) {
    throw new Error('Organization does not exist')
  }

  const prismaPetRepository = new PrismaPetRepository()
  const { pet_id } = await prismaPetRepository.create({
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

  const prismaPetLocationRepository = new PrismaPetLocationRepository()
  await prismaPetLocationRepository.create({
    latitude,
    longitude,
    pet: { connect: { id: pet_id } },
  })

  const prismaPetRequirementsRepository = new PrismaPetRequirementsRepository()

  const petRequirementsData = requirements.map((requirement) => ({
    requirement,
    pet_id,
  }))

  await prismaPetRequirementsRepository.create(petRequirementsData)
}
