import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should to get pet', async () => {
    await petsRepository.create({
      organization_id: 'org-id',
      id: 'yoda-id',
      name: 'Yoda',
      description: 'Beautiful',
      birth_at: '1234',
      size: 'SMALL',
      energy_level: 5
    })

    const { pet } = await sut.execute('yoda-id')

    expect(pet.id).toEqual('yoda-id')

    await expect(() =>
      sut.execute('any-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
