import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    return {
      pet
    }
  }
}
