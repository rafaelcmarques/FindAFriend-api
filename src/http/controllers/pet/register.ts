import { z } from 'zod'
import { Pet } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakePetRegisterUseCase } from '@/factories/make-pet-register-use-case'

import fs from 'node:fs'
import util from 'node:util'
import { pipeline } from 'node:stream'
import path from 'node:path'

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
    image_name: z.string(),
  })
  const organization_id = request.user.sub
  const imagePath = path.join(__dirname, '../../../../uploads')

  const pump = util.promisify(pipeline)

  try {
    const data = await request.file()
    if (!data) {
      throw new Error('Faça o upload de pelo menos uma imagem!')
    }

    const petRegisterUseCase = MakePetRegisterUseCase()

    const petData = petRegisterSchema.parse({
      ...(request.body as Pet),
      organization_id,
      image_name: data?.filename,
    })

    await petRegisterUseCase.execute(petData)

    const imageFilePath = path.join(imagePath, data.filename)
    const imageStream = fs.createWriteStream(imageFilePath)
    await pump(data.file, imageStream)

    reply.code(201).send(`Arquivo enviado com sucesso! ${data.filename}`)
  } catch (error) {
    if (error instanceof Error) {
      reply.code(400).send({ error: error.message })
    }
    throw error
  }
  reply.status(201).send()
}
