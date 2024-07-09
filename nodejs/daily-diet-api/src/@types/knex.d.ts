import 'Knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
    }

    meals: {
      id: string
      user_id: string
      name: string
      description: string
      doned_at: string
      is_on_the_diet: number
    }
  }
}
