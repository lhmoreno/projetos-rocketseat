import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(400, 'Title or description are empty').end()
      }

      const date = new Date().toISOString()

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: date,
        updated_at: date,
        completed_at: null
      }

      database.insert('tasks', task)

      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const exists = database.exists('tasks', id)
      
      if (!exists) {
        return res.writeHead(400, 'Task not found').end()
      }

      database.update('tasks', id, {
        completed_at: new Date().toISOString()
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const exists = database.exists('tasks', id)
      
      if (!exists) {
        return res.writeHead(400, 'Task not found').end()
      }

      if (!title && !description) {
        return res.writeHead(400, 'Title and description are empty').end()
      }

      database.update('tasks', id, {
        title,
        description
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const exists = database.exists('tasks', id)
      
      if (!exists) {
        return res.writeHead(400, 'Task not found').end()
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.query

      const tasks = database.select('tasks', {
        title,
        description
      })

      return res.end(JSON.stringify(tasks))
    }
  }
]
