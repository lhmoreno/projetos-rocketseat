import { Metadata } from 'next'
import NotAuthenticated from './components/NotAuthenticated'
import Profile from './components/Profile'

export const metadata: Metadata = {
  title: 'Book Wise | Perfil',
  description: 'Veja seu perfil'
}

export async function getProfile(userId: string) {
  const usersPromise = fetch(`http://localhost:4000/users?id=${userId}`, {
    cache: 'no-store'
  })

  const ratingsPromise = fetch(`http://localhost:4000/ratings?userId=${userId}&_expand=book&_sort=created_at&_order=desc&_limit=5`, {
    cache: 'no-store'
  })

  const [resUsers, resRatings] = await Promise.all([usersPromise, ratingsPromise])
  const [users, ratings] = await Promise.all([resUsers.json(), resRatings.json()]) as [tUser[], tRating[]]

  return {
    user: users[0],
    ratings
  }
}

const userId = '6624df61-5947-4f8c-9c7e-39c8c40fa158' // Luiz Henrique
// const userId = undefined

export default async function Page() {
  if (!userId) {
    return <NotAuthenticated />
  }

  const { user, ratings } = await getProfile(userId)

  return (
    <Profile user={user} ratings={ratings} />
  )
}
