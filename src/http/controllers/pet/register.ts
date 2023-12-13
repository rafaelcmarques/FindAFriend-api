import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakePetRegisterUseCase } from '@/factories/make-pet-register-use-case'

export async function petRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petRegisterSchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence_level: z.string(),
    animal_type: z.string(),
    environment: z.string(),
    city: z.string(),
    district: z.string(),
    number: z.string(),
    street: z.string(),
    zip_code: z.string(),
    latitude: z.string(),
    longitude: z.string(),

    requirements: z.array(z.string()),
    organization_id: z.string(),
  })

  const petData = petRegisterSchema.parse(request.body)

  const petRegisterUseCase = MakePetRegisterUseCase()

  try {
    await petRegisterUseCase.execute(petData)
  } catch (error) {
    reply.status(404).send()
  }

  reply.status(201).send()
}
