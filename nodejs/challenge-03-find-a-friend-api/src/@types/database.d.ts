interface Organization {
  id: string
  name: string
  email: string
  cep: string
  uf: string
  city: string
  street: string
  whatsapp: string
  password_hash: string
}

interface Pet {
  id: string
  organization_id: string
  name: string
  description: string
  birth_at: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level: number
  requirements?: string
}

interface CreateOrganization extends Organization {
  id?: string
}

interface CreatePet extends Pet {
  id?: string
}
