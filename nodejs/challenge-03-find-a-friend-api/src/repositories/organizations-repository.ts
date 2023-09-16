export interface OrganizationsRepository {
  create(data: CreateOrganization): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}
