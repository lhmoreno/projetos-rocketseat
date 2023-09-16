import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: CreatePet) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      organization_id: data.organization_id,
      name: data.name,
      description: data.description,
      birth_at: data.birth_at,
      size: data.size,
      energy_level: data.energy_level,
      requirements: data.requirements
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find(pet => pet.id === id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}
