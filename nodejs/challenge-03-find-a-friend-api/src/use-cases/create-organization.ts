import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcrypt'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface CreateOrganizationUseCaseRequest{
  name: string
  email: string
  cep: string
  uf: string
  city: string
  street: string
  whatsapp: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    cep,
    uf,
    city,
    street,
    whatsapp,
    password
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      cep,
      uf,
      city,
      street,
      whatsapp,
      password_hash
    })

    return {
      organization
    }
  }
}
