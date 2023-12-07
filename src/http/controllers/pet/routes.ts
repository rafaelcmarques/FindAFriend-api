import { FastifyInstance } from 'fastify'
import { petRegister } from './register'
import { searchPetsByCity } from './searchMany'
import { searchPetById } from './searchById'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', petRegister)
  app.get('/pet/:id', searchPetById)
  app.get('/pet/search/', searchPetsByCity)
}
