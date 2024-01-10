import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/factories/make-authenticate-use-case'
import { InvalidCredentialError } from '@/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
