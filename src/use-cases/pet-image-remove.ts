import { PetImageRepository } from '@/repositories/pet-image-repository'

interface PetImageRemoveParams {
  image_name: string
}

export class PetImageRemoveUseCase {
  constructor(private petImage: PetImageRepository) {}

  async execute({ image_name }: PetImageRemoveParams) {
    await this.petImage.remove(image_name)
  }
}
