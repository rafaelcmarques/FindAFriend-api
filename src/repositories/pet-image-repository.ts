import { PetImage, Prisma } from '@prisma/client'

export interface PetImageRepository {
  create(data: Prisma.PetImageCreateInput): Promise<PetImage>
  remove(image_name: string): Promise<void>
}
