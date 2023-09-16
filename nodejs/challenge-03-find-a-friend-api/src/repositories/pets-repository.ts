export interface PetsRepository {
  create(data: CreatePet): Promise<Pet>
  findById(id: string): Promise<Pet>
}
