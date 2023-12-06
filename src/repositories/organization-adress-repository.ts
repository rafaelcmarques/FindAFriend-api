import { Prisma } from '@prisma/client'

export interface OrganizationAdressRepository {
  create(data: Prisma.OrgAdressCreateInput): Promise<null>
}
