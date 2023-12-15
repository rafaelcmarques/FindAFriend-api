import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/session', authenticate)
}
