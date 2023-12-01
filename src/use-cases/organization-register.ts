import { prisma } from '@/lib/prisma'
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

export async function registerUseCase({
  name,
  email,
  password,
  responsable_name,
  district,
  number,
  phone,
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

  const { id: org_id } = await prisma.organization.create({
    data: {
      name,
      email,
      password_hash,
      phone,
      responsable_name,
    },
  })

  await prisma.orgAdress.create({
    data: {
      district,
      number,
      street,
      zip_code,
      organization_id: org_id,
    },
  })
}
