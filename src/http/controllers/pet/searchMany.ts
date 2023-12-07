import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchPetsByCity } from '@/factories/make-search-pets-by-city-use-case'

export async function searchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petSearchSchema = z.object({
    query: z.string(),
    page: z.coerce.number(),
  })

  const petData = petSearchSchema.parse(request.query)

  const searchPetByCity = MakeSearchPetsByCity()

  try {
    const pets = await searchPetByCity.execute(petData)
    reply.status(201).send({ pets })
  } catch (error) {
    reply.status(404).send({ message: error.message })
  }
}
