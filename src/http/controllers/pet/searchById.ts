import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchPetById } from '@/factories/make-search-pet-by-id-use-case '

export async function searchPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petSearchSchema = z.object({
    id: z.string(),
  })

  const petData = petSearchSchema.parse(request.params)

  const searchPetById = MakeSearchPetById()

  try {
    const pet = await searchPetById.execute(petData)
    reply.status(201).send({ ...pet })
  } catch (error) {
    reply.status(404).send({ message: error.message })
  }
}
