import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetLocationRepository {
  async create(data: Prisma.PetLocationCreateInput) {
    await prisma.petLocation.create({
      data,
    })
  }
}
