import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { petRoutes } from './http/controllers/pet/routes'
import { organizationRoutes } from './http/controllers/organization/routes'
import path from 'node:path'

import fastifyMultipart from '@fastify/multipart'
import { fastifyStatic } from '@fastify/static'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyMultipart)

app.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/show-image/',
})

app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
