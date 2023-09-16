import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: CreateOrganization) {
    const organization: Organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      street: data.street,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
