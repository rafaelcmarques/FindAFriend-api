import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

type CreateAdressOrganizationParams = Prisma.OrgAdressCreateInput

export class PrismaOrganizationAdressRepository {
  async create(data: CreateAdressOrganizationParams) {
    await prisma.orgAdress.create({
      data,
    })
  }
}
