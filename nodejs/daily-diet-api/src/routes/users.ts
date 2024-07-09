import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string()
    })

    const bodyParsed = createUserBodySchema.safeParse(request.body)

    if (!bodyParsed.success) {
      return reply.status(400).send(bodyParsed.error.message)
    }

    const { name } = bodyParsed.data

    const userId = randomUUID()
    
    await knex('users').insert({
      id: userId,
      name
    })

    reply.setCookie('userId', userId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(201).send()
  })

  app.get('/:id/metrics', async (request, reply) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getUsersParamsSchema.parse(request.params)
    const user_id = request.cookies.userId as string

    if (id !== user_id) {
      return reply.status(401).send()
    }
    
    const user = await knex('users')
      .where('id', id)
      .first()

    const meals = await knex('meals')
      .where('user_id', user_id)


    const total_meals = meals.length
    const diet_meals = meals.filter(meal => meal.is_on_the_diet).length
    const not_diet_meals = meals.length - diet_meals

    const { bestDietMealSequence } = meals
      .sort((a, b) => {
        const dateA = new Date(a.doned_at)
        const dateB = new Date(b.doned_at)

        if (dateA > dateB) return 1
        if (dateA < dateB) return -1

        return 0
      })
      .reduce((acumulator, meal) => {
        if (meal.is_on_the_diet) {
          acumulator.dietMealSequence += 1
        } else {
          acumulator.dietMealSequence = 0
        }

        if (acumulator.dietMealSequence > acumulator.bestDietMealSequence) {
          acumulator.bestDietMealSequence = acumulator.dietMealSequence
        }

        return acumulator
      }, { bestDietMealSequence: 0, dietMealSequence: 0 })

    return { 
      ...user,
      total_meals,
      diet_meals,
      not_diet_meals,
      bestDietMealSequence
    }
  })
}
