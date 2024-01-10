import { FastifyInstance } from 'fastify'
import { petRegister } from './register'
import { searchPetsByCity } from './searchMany'
import { searchPetById } from './searchById'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { petImageUpload } from './pet-image-upload'
import { petImageRemove } from './pet-image-remove'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:id', searchPetById)
  app.get('/pet/search/', searchPetsByCity)

  /** Authenticated */
  app.post(
    '/pet',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    petRegister,
  )
  app.patch(
    '/pet/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    petImageUpload,
  )
  app.delete(
    '/pet/:image_name',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    petImageRemove,
  )
}
