import { prisma } from '@/lib/prisma'

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
  const organization = await prisma.pet.findFirst({
    where: {
      organization_id,
    },
  })

  if (!organization) {
    throw new Error('Organization does not exist')
  }

  const { id: pet_id } = await prisma.pet.create({
    data: {
      name,
      age,
      description,
      animal_type,
      energy,
      environment,
      independence_level,
      size,
      organization_id,
    },
  })

  await prisma.petLocation.create({
    data: {
      latitude,
      longitude,
      pet_id,
    },
  })

  const requirementsData = requirements.map((requirement) => ({
    requirement,
    pet_id,
  }))

  await prisma.petRequirements.createMany({
    data: requirementsData,
  })
}
