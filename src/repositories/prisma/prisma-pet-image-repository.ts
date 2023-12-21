import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetImageRepository } from '../pet-image-repository'

export class PrismaPetImageRepository implements PetImageRepository {
  async create(data: Prisma.PetImageCreateInput) {
    const petImage = await prisma.petImage.create({
      data,
    })
    return petImage
  }

  async remove(image_name: string) {
    await prisma.petImage.delete({
      where: {
        name: image_name,
      },
    })
  }
}
