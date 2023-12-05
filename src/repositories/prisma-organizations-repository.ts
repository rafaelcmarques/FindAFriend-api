import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

type CreateOrganizationParams = Prisma.OrganizationCreateInput

export class PrismaOrganizationRepository {
  async create(data: CreateOrganizationParams) {
    const { id: org_id } = await prisma.organization.create({
      data,
    })
    return { org_id }
  }
}
