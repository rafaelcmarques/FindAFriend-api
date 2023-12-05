import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/organization-register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrationSchema = z.object({
    name: z.string(),
    responsable_name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),

    zip_code: z.string(),
    street: z.string(),
    district: z.string(),
    number: z.string(),
  })

  const registrationData = registrationSchema.parse(request.body)

  try {
    await registerUseCase(registrationData)
  } catch (error) {
    return reply.status(409).send()
  }

  reply.status(201).send()
}
