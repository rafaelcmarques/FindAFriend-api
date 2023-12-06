import { OrganizationAdressRepository } from '@/repositories/organization-adress-repository'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
  phone: string
  responsable_name: string

  district: string
  number: string
  street: string
  zip_code: string
}

export class RegisterUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private organizationAdressRepository: OrganizationAdressRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    responsable_name,
    phone,
    district,
    number,
    street,
    zip_code,
  }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6)

    const organizationWithEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithEmail) {
      throw new Error('E-mail already exists.')
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      password_hash,
      responsable_name,
      phone,
    })

    this.organizationAdressRepository.create({
      district,
      number,
      street,
      zip_code,
      organization: { connect: { id: organization.id } },
    })
  }
}
