import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetRepository {
  async create(data: Prisma.PetCreateInput) {
    const { id: pet_id } = await prisma.pet.create({
      data,
    })
    return { pet_id }
  }
}
