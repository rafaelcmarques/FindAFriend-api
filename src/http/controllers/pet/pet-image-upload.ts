import { z } from 'zod'
import crypto from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakePetImageUseCase } from '@/factories/make-image-upload-use-case'

import fs from 'node:fs'
import util from 'node:util'
import { pipeline } from 'node:stream'
import path from 'node:path'

export async function petImageUpload(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const pump = util.promisify(pipeline)
  const imagePath = path.join(__dirname, '../../../../uploads')

  const petImageSchema = z.object({
    name: z.string(),
    pet_id: z.string(),
  })

  const { id } = request.params as { id: string }

  try {
    const data = await request.file()
    if (!data) {
      throw new Error('Faça o upload de pelo menos uma imagem!')
    }

    const petImageUseCase = MakePetImageUseCase()

    const hash = crypto.createHash('md5')
    hash.update(data.filename + Date.now())
    const uniqueHash = hash.digest('hex')

    const name = `${uniqueHash}-${data.filename}`

    const imageData = petImageSchema.parse({ name, pet_id: id })

    await petImageUseCase.execute(imageData)

    const imageFilePath = path.join(imagePath, name)
    const imageStream = fs.createWriteStream(imageFilePath)
    await pump(data.file, imageStream)

    reply.code(201).send(`Arquivo enviado com sucesso! ${data.filename}`)
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ error: error.message })
    }
    throw error
  }
}
