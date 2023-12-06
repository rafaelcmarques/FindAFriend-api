import { PrismaOrganizationAdressRepository } from '@/repositories/prisma/prisma-organizations-adress-repository'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterUseCase } from '@/use-cases/organization-register'

export function makeOrganizationRegisterUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository()
  const prismaOrganizationAdressRepository =
    new PrismaOrganizationAdressRepository()

  const registerUseCase = new RegisterUseCase(
    prismaOrganizationRepository,
    prismaOrganizationAdressRepository,
  )

  return registerUseCase
}
