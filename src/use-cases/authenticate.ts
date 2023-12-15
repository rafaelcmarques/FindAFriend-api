import { InvalidCredentialError } from '@/errors/invalid-credentials-error'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { organization }
  }
}
