import { FastifyInstance } from 'fastify'
import { petRegister } from './register'
import { searchPetsByCity } from './searchMany'
import { searchPetById } from './searchById'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:id', searchPetById)
  app.get('/pet/search/', searchPetsByCity)

  /** Authenticated */
  app.post('/pet', { onRequest: [verifyJWT] }, petRegister)
}
