import ButtonOpenSidePanel from '@/components/client/ButtonOpenSidePanel'
import Avatar from '@/components/server/Avatar'
import RateStars from '@/components/server/RateStars'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface ProfileProps {
  user: tUser
  ratings: tRating[]
}

export default function Profile({ user, ratings }: ProfileProps) {
  return (
    <main className="flex justify-between gap-14">
      <div className="flex-1">
        <div className="w-full mt-8 flex flex-col gap-6 max-w-[39rem]">
          {ratings.map(rating => {
            const distance = formatDistanceToNow(new Date(rating.created_at), {
              locale: ptBR,
              addSuffix: true
            })

            return (
              <div key={rating.id} className="flex flex-col gap-2">
                <span className="ml-2 text-sm text-gray-300">{distance}</span>

                <div className="px-5 py-4 bg-gray-700 rounded-lg">
                  <div className="flex gap-5">
                    <ButtonOpenSidePanel type="image" book={rating.book}>
                      <Image 
                        src={rating.book.cover_url}
                        alt=""
                        width={107}
                        height={150}
                      />
                    </ButtonOpenSidePanel>
                    <div className="flex-1 flex flex-col py-1">
                      <ButtonOpenSidePanel type="text" book={rating.book}>
                        <strong className="line-clamp-2">{rating.book.name}</strong>
                      </ButtonOpenSidePanel>
                      <p className="text-sm text-gray-400">{rating.book.author}</p>

                      <div className="mt-auto">
                        <RateStars rate={rating.book.rate_average} />
                        <p className="mt-1.5 text-sm text-gray-400">{rating.book.rate_length} avaliações</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-gray-300">{rating.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative">
        <div className="sticky top-10 flex flex-col items-center">
          <Avatar 
            src={user.avatar_url}
            alt={`Foto de perfil do(a) ${user.name}`}
            size="xl"
          />
          <div className="mt-5 text-center">
            <strong className="text-xl">{user.name}</strong>
            <p className="text-sm text-gray-400">membro desde 2019</p>
          </div>
          <hr className="mt-10 mb-8 w-8 h-1 rounded-full bg-gradient-horizontal" />
          <div className="py-5 px-14 flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <i className="ph ph-book-open text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.pages_read}</strong>
                <p className="text-sm text-gray-300">Páginas lidas</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-books text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.ratings_amount}</strong>
                <p className="text-sm text-gray-300">Livros avaliados</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-user-list text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.authors_read}</strong>
                <p className="text-sm text-gray-300">Autores lidos</p>
              </div>
            </div>
            {user.most_read_category && (
              <div className="flex gap-5 items-center">
                <i className="ph ph-bookmark-simple text-green-100 text-4xl" />
                <div>
                  <strong className="text-gray-200">{user.most_read_category}</strong>
                  <p className="text-sm text-gray-300">Categoria mais lida</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
