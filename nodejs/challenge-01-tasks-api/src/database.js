import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, filter) {
    let data = this.#database[table] ?? []

    const search = {}

    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        search[key] = value
      }
    })

    if (Object.keys(search).length > 0) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  exists(table, id) {
    const data = this.#database[table].find(value => value.id === id)

    return !!data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      const newData = {}

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'undefined') {
          newData[key] = value
        }
      })

      this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], ...newData }
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
