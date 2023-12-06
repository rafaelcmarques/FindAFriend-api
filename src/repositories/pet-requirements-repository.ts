import { Prisma } from '@prisma/client'

export interface PetRequirementsRepository {
  create(data: Prisma.PetRequirementsCreateManyInput[]): Promise<null>
}
