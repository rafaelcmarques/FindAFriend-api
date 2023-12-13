import { Pet, Prisma } from '@prisma/client'
export interface SearchManyOptions {
  city: string
  page: number
  type?: string
  age?: string
  size?: string
  energy?: string
  independence_level?: string
  environment?: string
}
export interface PetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  searchMany({
    city,
    page,
    age,
    energy,
    environment,
    independence_level,
    size,
    type,
  }: SearchManyOptions): Promise<Pet[]>
  searchById(id: string): Promise<Pet | null>
}
