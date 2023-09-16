import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcrypt'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should to create organization', async () => {
    const { organization } = await sut.execute({
      name: 'Org',
      email: 'email@org.com',
      cep: '99999-999',
      uf: 'ZZ',
      city: 'Orlando',
      street: 'Maybe',
      whatsapp: '+5599999999999',
      password: '123456'
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Org',
      email: 'email@org.com',
      cep: '99999-999',
      uf: 'ZZ',
      city: 'Orlando',
      street: 'Maybe',
      whatsapp: '+5599999999999',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create organizastion with same email twice', async () => {
    const email = 'email@org.com'

    await sut.execute({
      name: 'Org',
      email,
      cep: '99999-999',
      uf: 'ZZ',
      city: 'Orlando',
      street: 'Maybe',
      whatsapp: '+5599999999999',
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'Org 2',
        email,
        cep: '88888-888',
        uf: 'AA',
        city: 'Orlando 2',
        street: 'Maybe 2',
        whatsapp: '+5599999999999',
        password: '12345678'
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
