import { Metadata } from 'next'
import NotAuthenticated from '../components/NotAuthenticated'
import Profile from '../components/Profile'
import { getProfile } from '../page'

interface PageProps {
  params: {
    userId: string
  }
}

type GenerateMetadata = (props: PageProps) => Promise<Metadata>

export const generateMetadata: GenerateMetadata = async ({ params }) => {
  const res = await fetch(`http://localhost:4000/users?id=${params.userId}`, {
    cache: 'no-store'
  })

  const users = await res.json() as tUser[]
  const user = users[0]

  return {
    title: `Book Wise | ${user.name}`,
    description: `Veja o perfil do(a) ${user.name}`
  }
}

export default async function Page({ params }: PageProps) {
  // if (!userId) {
  //   return <NotAuthenticated />
  // }

  const { user, ratings } = await getProfile(params.userId)

  return (
    <Profile user={user} ratings={ratings} />
  )
}
