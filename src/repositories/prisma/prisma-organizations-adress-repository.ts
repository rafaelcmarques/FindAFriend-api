import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationAdressRepository } from '../organization-adress-repository'

export class PrismaOrganizationAdressRepository
  implements OrganizationAdressRepository
{
  async create(data: Prisma.OrgAdressCreateInput) {
    await prisma.orgAdress.create({
      data,
    })
    return null
  }
}
