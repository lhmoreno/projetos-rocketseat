import Link from 'next/link'
import Avatar from './Avatar'
import RateStars from './RateStars'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RatingHeaderProps {
  user: tUser
  createdAt: string
  rate: number
}

export default function RatingHeader({user, createdAt, rate}: RatingHeaderProps) {
  const distance = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <header className="flex gap-4">
      <Link 
        href={`/profile/${user.id}`}
        className="transition-opacity hover:opacity-80"
      >
        <Avatar 
          src={user.avatar_url}
          alt={`Foto de perfil do(a) ${user.name}`}
        />
      </Link>

      <div>
        <Link 
          href={`/profile/${user.id}`}
          className="hover:underline"
        >
          {user.name}
        </Link>
        <p className="text-sm text-gray-400">{distance}</p>
      </div>
      <RateStars rate={rate} className="ml-auto" />
    </header>
  )
}
