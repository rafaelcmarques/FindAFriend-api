import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'

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

  async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        petLocation: {
          city: query,
        },
      },
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
