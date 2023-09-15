'use client'

import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

import RateStars from '../components/server/RateStars'
import RatingHeader from '@/components/server/RatingHeader'
import { useAuth } from './AuthContext'
import Avatar from '@/components/server/Avatar'

interface SidePanelContextProps {
  toggleBook: (book: tBook) => void
}

const SidePanelContext = createContext({} as SidePanelContextProps)

export function useSidePanel() {
  const ctx = useContext(SidePanelContext)

  return ctx
}

export function SidePanelProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const [book, setBook] = useState<tBook>()
  const [ratings, setRatings] = useState<tRating[]>([])

  const { user } = useAuth()

  const [showRateInput, setShowRateInput] = useState(false)
  const [rate, setRate] = useState(0)
  
  async function toggleBook(book: tBook) {
    setBook(book)
    setOpen(true)
    
    const res = await fetch(`http://localhost:4000/ratings?bookId=${book.id}&_expand=user`)
    const data = await res.json()
  
    setRatings(data)
  }

  function handleOpen(value: boolean) {
    if (!value) {
      setRatings([])
      setShowRateInput(false)
      setRate(0)
    }

    setOpen(value)
  }

  function handleOpenRateInput() {
    if (!user) return null

    setShowRateInput(true)
  }

  return (
    <SidePanelContext.Provider value={{toggleBook}}>
      <Dialog.Root open={open} onOpenChange={handleOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />

          <Dialog.Content className="w-full max-w-2xl bg-gray-800 fixed top-0 bottom-0 right-0 px-12 py-16 overflow-y-scroll">
            {book && (
              <div className="px-8 py-6 bg-gray-700 rounded-lg rounded-xl">
                <div className="flex gap-8">
                  <Image 
                    src={book.cover_url}
                    alt=""
                    className="rounded-xl"
                    width={167}
                    height={234}
                  />
                  <div className="flex-1 flex flex-col py-1">
                    <strong className="line-clamp-2 text-lg">{book.name}</strong>
                    <p className="mt-2 text-gray-400">{book.author}</p>

                    <div className="mt-auto">
                      <RateStars 
                        rate={book.rate_average} 
                        className="text-xl"
                      />
                      <p className="mt-1.5 text-sm text-gray-400">{book.rate_length} avaliações</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 border-t border-gray-600 flex gap-14 py-6">
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-bookmark-simple text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Categoria</p>
                      <strong className="text-gray-200">{book.categories.map(c => c.name).join(', ')}</strong>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-book-open text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Páginas</p>
                      <strong className="text-gray-200">{book.total_pages}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ratings */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <p className="text-gray-200 text-sm">Avaliações</p>
                {!showRateInput && (
                  <button 
                    className="px-2 py-1 text-purple-100 font-bold" 
                    onClick={handleOpenRateInput}
                  >
                    Avaliar
                  </button>
                )}
              </div>

              <div className="mt-4">
                {user && showRateInput && (
                  <div className="bg-gray-700 rounded-lg p-6">
                    <header className="flex items-center gap-4">
                      <Avatar 
                        src={user.avatar_url}
                        alt={`Foto de perfil do(a) ${user.name}`}
                        size="md"
                      />
                      <strong>{user.name}</strong>
                      <div className="flex-1 text-3xl text-purple-100 flex justify-end gap-1">
                        <button onClick={() => setRate(1)}>
                          <i className={`${rate > 0 ? 'ph-fill' : 'ph'} ph-star`} />
                        </button>
                        <button onClick={() => setRate(2)}>
                          <i className={`${rate > 1 ? 'ph-fill' : 'ph'} ph-star`} />
                        </button>
                        <button onClick={() => setRate(3)}>
                          <i className={`${rate > 2 ? 'ph-fill' : 'ph'} ph-star`} />
                        </button>
                        <button onClick={() => setRate(4)}>
                          <i className={`${rate > 3 ? 'ph-fill' : 'ph'} ph-star`} />
                        </button>
                        <button onClick={() => setRate(5)}>
                          <i className={`${rate > 4 ? 'ph-fill' : 'ph'} ph-star`} />
                        </button>
                      </div>
                    </header>
                    <div className="mt-6">
                      <textarea 
                        placeholder="Escreva sua avaliação"
                        className="w-full h-48 px-5 py-3 border border-gray-500 rounded bg-gray-800 text-gray-200 resize-none placeholder:text-gray-400" 
                      />
                      <div className="mt-3 flex justify-end gap-2">
                        <button 
                          className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500"
                          onClick={() => setShowRateInput(false)}
                        >
                          <i className="ph ph-x text-purple-100 text-2xl" />
                        </button>
                        <button className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500">
                          <i className="ph ph-check text-green-100 text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <ul className="mt-3 flex flex-col gap-3">
                  {ratings.map(rating => {
                    return (
                      <li key={rating.id} className="bg-gray-700 rounded-lg p-6">
                        <RatingHeader  
                          user={rating.user} 
                          createdAt={rating.created_at} 
                          rate={rating.rate} 
                        />

                        <p className="mt-5 text-gray-300">{rating.description}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="absolute top-0 right-0 m-6 text-gray-400 transition-colors hover:text-gray-200" aria-label="Fechar">
                <i className="ph ph-x text-2xl" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
      {children}
    </SidePanelContext.Provider>
  )
}
