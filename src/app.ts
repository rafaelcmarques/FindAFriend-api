import fastify from 'fastify'
import { petRoutes } from './http/controllers/pet/routes'
import { organizationRoutes } from './http/controllers/organization/routes'

export const app = fastify()

app.register(organizationRoutes)
app.register(petRoutes)
