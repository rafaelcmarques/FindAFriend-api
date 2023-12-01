import { FastifyInstance } from 'fastify'
import { register } from './controllers/organization/register'
import { petRegister } from './controllers/pet/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/pet', petRegister)
}
