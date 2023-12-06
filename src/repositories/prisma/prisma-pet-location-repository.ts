import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetLocationRepository } from '../pet-location-repository'

export class PrismaPetLocationRepository implements PetLocationRepository {
  async create(data: Prisma.PetLocationCreateInput) {
    await prisma.petLocation.create({
      data,
    })
    return null
  }
}
