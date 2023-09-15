import Link from 'next/link'
import ClientBooks from './books'
import { Suspense } from 'react'

interface PageProps {
  searchParams: {
    [param: string]: string | string [] | undefined
  }
}

export const metadata = {
  title: 'Book Wise | Explorar',
  description: 'Encontre os melhores livros'
}

function getCategoryParams(param: string | string [] | undefined) {
  if (typeof param === 'undefined') return []
  if (typeof param === 'string') return [param]

  return param
}

async function getCategories(categoryParams: string[]) {
  const res = await fetch('http://localhost:4000/categories')
  const data = await res.json() as tCategory[]

  const categories = data.map(category => {
    const active = categoryParams.includes(category.slug)
    const params = new URLSearchParams()
    
    if (active) {
      categoryParams.forEach(value => value !== category.slug && params.append('category', value))
    } else {
      categoryParams.forEach(value => params.append('category', value))
      params.append('category', category.slug)
    }
    
    const href = '/books?' + params.toString()

    return {...category, active, href}
  })

  return categories
}

async function getBooks(categoryParams: string[]) {
  const res = await fetch('http://localhost:4000/books', {
    cache: 'no-store'
  })

  const books = await res.json() as tBook[]

  if (!categoryParams.length) return books

  const filteredBooks = books.filter(book => book.categories.find(category => categoryParams.includes(category.slug)))

  return filteredBooks
}

function stylesLinkActive(active?: boolean) {
  if (active) {
    return 'px-4 py-1 bg-purple-200 rounded-full flex items-center justify-center'
  } else {
    return 'px-4 py-1 text-purple-100 border border-purple-100 rounded-full flex items-center justify-center'
  }
}

export default async function Books({ searchParams }: PageProps) {
  const categoryParams = getCategoryParams(searchParams.category)

  const categories = await getCategories(categoryParams)
  const booksPromise = getBooks(categoryParams)
  
  return (
    <div className="flex flex-col gap-12">
      <nav className="flex gap-3 flex-wrap">
        <Link
          href="/books"
          prefetch={false}
          className={stylesLinkActive(!categoryParams.length)}
        >
          Tudo
        </Link>
        {categories.map(category => {
          return (
            <Link
              key={category.slug}
              href={category.href}
              prefetch={false}
              className={stylesLinkActive(category.active)}
            >
              {category.name}
            </Link>
          )
        })}
      </nav>

      <Suspense fallback={<FallbackBooks />}>
        <ClientBooks promise={booksPromise} />
      </Suspense>
    </div>
  )
}

function FallbackBooks() {
  const numbers = Array.from(new Array(15), (_, i) => String(i + 1))

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden h-loading-books">
        <div className="grid grid-cols-3 gap-4">
          {numbers.map(id => {
            return (
              <div key={id} className="px-5 py-4 bg-gray-700 rounded-lg">
                <div className="animate-pulse flex gap-5">
                  <div className="h-40 w-32 bg-gray-300/10 rounded" />
                  <div className="py-3">
                    <div className="h-4 w-32 bg-gray-300/10 rounded" />
                    <div className="mt-2 h-3 w-24 bg-gray-300/10 rounded" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
