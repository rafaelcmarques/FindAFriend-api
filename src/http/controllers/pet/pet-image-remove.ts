import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakePetImageRemoveUseCase } from '@/factories/make-image-remove-use-case copy'
import path from 'node:path'
import fs from 'node:fs/promises'

export async function petImageRemove(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petImageSchema = z.object({
    image_name: z.string(),
  })

  const { image_name } = petImageSchema.parse(request.params)
  const imagePath = path.join(__dirname, '../../../../uploads', image_name)

  const petImageRemoveUseCase = MakePetImageRemoveUseCase()

  try {
    await petImageRemoveUseCase.execute({ image_name })

    await fs.access(imagePath, fs.constants.F_OK)
    await fs.unlink(imagePath)

    reply.code(201).send(`Arquivo removido com sucesso!`)
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ error: error.message })
    }
    throw error
  }
}
