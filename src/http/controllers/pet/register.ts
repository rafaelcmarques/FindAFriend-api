import { z } from 'zod'
import { Pet } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
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
  const organization_id = request.user.sub

  try {
    const petRegisterUseCase = MakePetRegisterUseCase()

    const petData = petRegisterSchema.parse({
      ...(request.body as Pet),
      organization_id,
    })

    await petRegisterUseCase.execute(petData)

    reply.code(201).send(`Pet registrado com sucesso!`)
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ error: error.message })
    }
    throw error
  }
  reply.status(201).send()
}
