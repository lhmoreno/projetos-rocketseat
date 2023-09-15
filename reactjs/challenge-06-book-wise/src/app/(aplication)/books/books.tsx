import ButtonOpenSidePanel from '@/components/client/ButtonOpenSidePanel'
import RateStars from '@/components/server/RateStars'
import Image from 'next/image'
import { use } from 'react'

export default function ClientBooks({promise}: {promise: Promise<tBook[]>}) {
  const books = use(promise)

  return (
    <div className="grid grid-cols-3 gap-4">
      {books.map(book => {
        return (
          <div key={book.id} className="px-5 py-4 bg-gray-700 rounded-lg flex gap-5">
            <ButtonOpenSidePanel type="image" book={book}>
              <Image 
                src={book.cover_url}
                alt=""
                width={107}
                height={150}
              />
            </ButtonOpenSidePanel>
            <div className="flex-1 flex flex-col py-1">
              <ButtonOpenSidePanel type="text" book={book}>
                <strong className="line-clamp-2">{book.name}</strong>
              </ButtonOpenSidePanel>
              <p className="text-sm text-gray-400">{book.author}</p>

              <div className="mt-auto">
                <RateStars rate={book.rate_average} />
                <p className="mt-1.5 text-sm text-gray-400">{book.rate_length} avaliações</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
