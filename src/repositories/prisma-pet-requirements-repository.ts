import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetRequirementsRepository {
  async create(data: Prisma.PetRequirementsCreateManyInput[]) {
    await prisma.petRequirements.createMany({
      data,
    })
  }
}
