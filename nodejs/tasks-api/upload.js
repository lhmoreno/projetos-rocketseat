import fs from 'node:fs/promises'
import { parse } from 'csv-parse'

const tasksCsvPath = new URL('tasks.csv', import.meta.url)

fs.readFile(tasksCsvPath, 'utf8')
.then(async (file) => {
  const parser = parse(file)

  let isFirstRow = true

  for await (const chunk of parser) {
    if (!isFirstRow) {
      const task = {
        title: chunk[0],
        description: chunk[1]
      }

      fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
      }).then(() => {
        console.log('Created: ', chunk[0])
      }).catch(() => {
        console.log('Failed: ', chunk[0])
      })
    }

    isFirstRow = false
  }
})
.catch(() => {
  console.error('tasks.csv not found')
})
