import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should to create pet', async () => {
    const { pet } = await sut.execute({
      organization_id: 'org-id',
      name: 'Yoda',
      description: 'Beautiful',
      birth_at: '1234',
      size: 'SMALL',
      energy_level: 5
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
