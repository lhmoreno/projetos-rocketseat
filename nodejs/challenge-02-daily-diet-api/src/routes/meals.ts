import { FastifyInstance, RequestGenericInterface } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkUserIdExists } from '../middlewares/check-user-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkUserIdExists)

  app.post('/', async (request, reply) => {
    const createFoodingBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      donedAt: z.coerce.date(),
      isOnTheDiet: z.boolean()
    })

    const bodyParsed = createFoodingBodySchema.safeParse(request.body)

    if (!bodyParsed.success) {
      return reply.status(400).send(bodyParsed.error.message)
    }

    const { name, description, donedAt, isOnTheDiet } = bodyParsed.data
    const user_id = request.cookies.userId as string

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      doned_at: donedAt.toISOString(),
      is_on_the_diet: isOnTheDiet ? 1 : 0,
      user_id
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const updateMealsParamsSchema = z.object({
      id: z.string().uuid()
    })

    const updateFoodingBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      donedAt: z.coerce.date(),
      isOnTheDiet: z.boolean()
    })

    const bodyParsed = updateFoodingBodySchema.safeParse(request.body)

    if (!bodyParsed.success) {
      return reply.status(400).send(bodyParsed.error.message)
    }

    const { id } = updateMealsParamsSchema.parse(request.params)
    const user_id = request.cookies.userId as string
    const { name, description, donedAt, isOnTheDiet } = bodyParsed.data

    const meal = await knex('meals')
      .where('id', id)
      .first()

    if (!meal) {
      return reply.status(404).send()
    }

    if (meal.user_id !== user_id) {
      return reply.status(401).send()
    }

    await knex('meals')
      .where('id', id)
      .update({
        name,
        description,
        doned_at: donedAt.toISOString(),
        is_on_the_diet: isOnTheDiet ? 1 : 0
      })

    return reply.status(204).send()
  })

  app.get('/', async (request) => {
    const user_id = request.cookies.userId as string

    const data = await knex('meals').where('user_id', user_id)

    const meals = data.map(meal => {
      return {
        id: meal.id,
        name: meal.name,
        description: meal.description,
        doned_at: meal.doned_at,
        is_on_the_diet: !!meal.is_on_the_diet,
      }
    })

    return { meals }
  })

  app.get('/:id', async (request, reply) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getMealsParamsSchema.parse(request.params)
    const user_id = request.cookies.userId as string

    const data = await knex('meals')
      .where('id', id)
      .first()

    if (!data) {
      return reply.status(404).send()
    }

    if (data.user_id !== user_id) {
      return reply.status(401).send()
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      doned_at: data.doned_at,
      is_on_the_diet: !!data.is_on_the_diet,
    }
  })

  app.delete('/:id', async (request, reply) => {
    const deleteMealsParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = deleteMealsParamsSchema.parse(request.params)
    const user_id = request.cookies.userId as string

    const meal = await knex('meals')
      .where('id', id)
      .first()

    if (!meal) {
      return reply.status(404).send()
    }

    if (meal.user_id !== user_id) {
      return reply.status(401).send()
    }

    await knex('meals')
      .where('id', id)
      .delete()

    return reply.status(204).send()
  })
}
