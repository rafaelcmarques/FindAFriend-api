import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
export const app = fastify()

const prisma = new PrismaClient()

prisma.organization.create({
  data: {
    email: 'rafaelcarvalhomarques@hotmail.com',
    password_hash: '123456',
    phone: '(31)999449983',
    responsable_name: 'Rafael Marques',
  },
})
