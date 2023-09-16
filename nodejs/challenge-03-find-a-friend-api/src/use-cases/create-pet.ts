import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    organization_id,
    name,
    description,
    birth_at,
    size,
    energy_level,
    requirements
  }: CreatePet): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      id,
      organization_id,
      name,
      description,
      birth_at,
      size,
      energy_level,
      requirements
    })

    return {
      pet
    }
  }
}
