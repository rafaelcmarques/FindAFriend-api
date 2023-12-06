import { Prisma } from '@prisma/client'

export interface PetLocationRepository {
  create(data: Prisma.PetLocationCreateInput): Promise<null>
}
