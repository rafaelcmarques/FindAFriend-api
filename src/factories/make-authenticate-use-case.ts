import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository()

  const authenticateUseCase = new AuthenticateUseCase(
    prismaOrganizationRepository,
  )

  return authenticateUseCase
}
