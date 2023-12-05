import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaOrganizationRepository } from '@/repositories/prisma-organizations-repository'
import { PrismaOrganizationAdressRepository } from '@/repositories/prisma-organizations-adress-repository'

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

export async function registerUseCase({
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

  const userWithEmail = await prisma.organization.findUnique({
    where: {
      email,
    },
  })

  if (userWithEmail) {
    throw new Error('E-mail already exists')
  }

  const prismaOrganizationRepository = new PrismaOrganizationRepository()

  const { org_id } = await prismaOrganizationRepository.create({
    name,
    email,
    password_hash,
    responsable_name,
    phone,
  })

  const prismaOrganizationAdressRepository =
    new PrismaOrganizationAdressRepository()

  prismaOrganizationAdressRepository.create({
    district,
    number,
    street,
    zip_code,
    organization: { connect: { id: org_id } },
  })
}
