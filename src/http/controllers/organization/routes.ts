import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.patch('/token/refresh', refresh)

  app.post('/session', authenticate)
}
