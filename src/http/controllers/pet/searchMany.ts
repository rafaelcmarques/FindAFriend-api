import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchPetsByCity } from '@/factories/make-search-pets-by-city-use-case'

export async function searchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petSearchSchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    type: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independence_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const petData = petSearchSchema.parse(request.query)

  const searchPetByCity = MakeSearchPetsByCity()

  try {
    const pets = await searchPetByCity.execute(petData)
    reply.status(201).send({ pets })
  } catch (error) {
    reply.status(404).send()
  }
}
