import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { petRegisterUseCase } from '@/use-cases/pet-register'

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

    latitude: z.string(),
    longitude: z.string(),

    requirements: z.array(z.string()),
    organization_id: z.string(),
  })

  const {
    name,
    description,
    age,
    size,
    energy,
    independence_level,
    animal_type,
    environment,
    latitude,
    longitude,
    requirements,
    organization_id,
  } = petRegisterSchema.parse(request.body)

  try {
    await petRegisterUseCase({
      name,
      description,
      age,
      size,
      energy,
      independence_level,
      animal_type,
      environment,
      latitude,
      longitude,
      requirements,
      organization_id,
    })
  } catch (error) {
    reply.status(404).send({ message: error.message })
  }

  reply.status(201).send()
}
