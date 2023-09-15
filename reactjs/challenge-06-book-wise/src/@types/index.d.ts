interface tUser {
  id: string
  name: string
  avatar_url: string
  pages_read: number
  ratings_amount: number
  most_read_category?: string
  authors_read: number
}

interface tCategory {
  slug: string
  name: string
}

interface tBook {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  rate_length: number
  rate_average: number
  categories: tCategory[]
}

interface tRating {
  id: string
  rate: number
  description: string
  created_at: string
  user: tUser
  book: tBook
}
