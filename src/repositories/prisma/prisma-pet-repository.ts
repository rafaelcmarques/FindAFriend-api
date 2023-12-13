import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRepository, SearchManyOptions } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async searchById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
      include: {
        petLocation: true,
        petRequirements: true,
      },
    })
    return pet
  }

  async searchMany({
    city,
    page,
    type,
    age,
    size,
    energy,
    independence_level,
    environment,
  }: SearchManyOptions) {
    const whereClause: any = {
      petLocation: {
        city,
      },
    }

    if (type) {
      whereClause.animal_type = type
    }
    if (age) {
      whereClause.age = age
    }
    if (size) {
      whereClause.size = size
    }
    if (energy) {
      whereClause.energy = energy
    }
    if (independence_level) {
      whereClause.independence_level = independence_level
    }
    if (environment) {
      whereClause.environment = environment
    }

    const pets = await prisma.pet.findMany({
      where: whereClause,
      include: {
        petLocation: true,
        petRequirements: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }
}
