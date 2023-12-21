import { PetImageRepository } from '@/repositories/pet-image-repository'
import { PetImage } from '@prisma/client'

interface PetImageParams {
  pet_id: string
  name: string
}

interface PetImageResponse {
  petImage: PetImage
}

export class PetImageUploadUseCase {
  constructor(private petImage: PetImageRepository) {}

  async execute({ pet_id, name }: PetImageParams): Promise<PetImageResponse> {
    const petImage = await this.petImage.create({
      name,
      pet: { connect: { id: pet_id } },
    })

    return { petImage }
  }
}
