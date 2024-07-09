import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'

export async function checkUserIdExists(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.cookies.userId

  if (!userId) {
    return reply.status(401).send()
  }

  const user = await knex('users').where('id', userId).first()

  if (!user) {
    return reply.status(401).send()
  }
}
